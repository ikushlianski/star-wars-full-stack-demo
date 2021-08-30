import { dataFetcher, DataFetcher } from './data-fetcher';
import RedisClient, { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { Person, PersonsResponse } from '../contracts/person';
import { SpeciesMap, SpeciesResponse } from '../contracts/species';
import { Collection } from '../express-app/enums/collection';

class SWApiWorker {
  fetcher: DataFetcher;
  redis: Redis;

  constructor(dataFetcher: DataFetcher) {
    this.fetcher = dataFetcher;

    // on a real project, we could use DI and not hardcode Redis as the only storage here
    this.redis = new RedisClient();
  }

  public run = async () => {
    await this.redis.flushall();

    const pageUrls = this.fetcher.getPageUrls();
    const rawResponses = await this.fetcher.fetchData<PersonsResponse>(
      pageUrls,
    );
    const peopleToSave = this.extractPersons(rawResponses);
    const speciesUrls = peopleToSave
      .map((person) => person.species[0])
      .filter(Boolean);
    const rawSpecies = await this.fetcher.fetchData<SpeciesResponse>(
      speciesUrls,
    );

    const speciesMap = this.speciesToMap(rawSpecies);

    const peopleWithSpecies = peopleToSave.map((person) => ({
      ...person,
      // let's assume every person belongs to one species for now
      species: speciesMap[person.species[0]],
    }));

    await this.savePeople(peopleWithSpecies);
  };

  private extractPersons = (rawResponses: PersonsResponse[]): Person[] => {
    return rawResponses.reduce((people: Person[], apiResponse) => {
      const { results } = apiResponse;
      const persons: Person[] = results.map(
        ({ name, height, mass, birth_year, species }: Person) => {
          return {
            id: uuidv4(),
            name,
            height,
            mass,
            birth_year,
            species,
          };
        },
      );

      people.push(...persons);

      return people;
    }, []);
  };

  private savePeople = async (peopleToSave: Person[]) => {
    const byIdSavePromises = peopleToSave.map((person) => {
      return this.redis.hset(
        Collection.ById,
        person.id,
        JSON.stringify(person),
      );
    });

    const byAgeSavePromises = peopleToSave.map((person) => {
      return this.redis.zadd(
        Collection.ByAge,
        parseInt(person.birth_year) || 0,
        person.id,
      );
    });

    const byNameSavePromises = peopleToSave.map((person) => {
      return this.redis.zadd(
        Collection.ByName,
        0, // same score for all, so sort lexicographically
        JSON.stringify({
          sort_col: person.name, // comes first in the JSON string - responsible for sorting records by name
          id: person.id,
        }),
      );
    });

    await Promise.all([
      ...byIdSavePromises,
      ...byAgeSavePromises,
      ...byNameSavePromises,
    ]);
  };

  private speciesToMap = (rawSpecies: SpeciesResponse[]) => {
    return rawSpecies.reduce((acc: SpeciesMap, species) => {
      acc[species.url] = species.name;

      return acc;
    }, {});
  };
}

export const worker = new SWApiWorker(dataFetcher);
