import axios from 'axios';
import { ApiResponse } from '../contracts/api-response';
import { Person } from '../contracts/person';
import RedisClient, { Redis } from 'ioredis';
import { Collection } from '../express-app/enums/collection';

class SWApiWorker {
  // hardcoded for simplicity. We could fetch API's "pages" in batches of 5-10 and look at "next" link in each result to see whether we should stop
  PAGE_COUNT = 9;
  BASE_URL = process.env.SW_API_BASE_URL;

  redis: Redis;

  constructor() {
    // on a real project, we could use DI and not hardcode Redis as the only storage here
    this.redis = new RedisClient();
  }

  public run = async () => {
    const pageUrls = this.getPageUrls();
    const rawResponses = await this.fetchData(pageUrls);
    const peopleToSave = this.extractPersons(rawResponses);

    await this.savePeople(peopleToSave);
  };

  private getPageUrls = (): string[] => {
    const { pages } = new Array(this.PAGE_COUNT).fill(1).reduce(
      (acc, cur) => {
        acc.pages.push(`${this.BASE_URL}?page=${cur + acc.counter}`);

        acc.counter += 1;

        return acc;
      },
      { counter: 0, pages: [] },
    );

    return pages;
  };

  private fetchData = async (urls: string[]): Promise<ApiResponse[]> => {
    const requests = urls.map((url) => {
      return axios.get(url);
    });

    const results = await Promise.all(requests);

    return results.map((result) => result.data);
  };

  private extractPersons = (rawResponses: ApiResponse[]): Person[] => {
    return rawResponses.reduce((people: Person[], apiResponse) => {
      const { results } = apiResponse;
      const persons: Person[] = results.map(
        ({ name, height, mass, birth_year }) => {
          return {
            name,
            height,
            mass,
            birth_year,
          };
        },
      );

      people.push(...persons);

      return people;
    }, []);
  };

  private savePeople = async (peopleToSave: Person[]) => {
    const byAgeSavePromises = peopleToSave.map((person) => {
      return this.redis.zadd(
        Collection.ByAge,
        parseInt(person.birth_year) || 0,
        JSON.stringify(person),
      );
    });

    const byNameSavePromises = peopleToSave.map((person) => {
      return this.redis.zadd(
        Collection.ByName,
        0, // same score for all, so sort lexicographically
        JSON.stringify({
          sort_col: person.name, // comes first in the JSON string - responsible for sorting records by name
          ...person,
        }),
      );
    });

    await Promise.all([...byAgeSavePromises, ...byNameSavePromises]);
  };
}

export const worker = new SWApiWorker();

worker
  // we could auto-clear Redis data before running next time
  .run()
  .then(() => {
    console.log('worker finished running');
  })
  .catch((error) => {
    console.error(error);

    process.exit(1);
  })
  .finally(() => {
    process.exit();
  });
