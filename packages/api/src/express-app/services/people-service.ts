import RedisClient, { Redis } from 'ioredis';
import { SortBy } from '../enums/sort-by';
import { Collection } from '../enums/collection';
import { SortDir } from '../enums/sort-dir';

class PeopleService {
  redis: Redis;

  constructor() {
    this.redis = new RedisClient();
  }

  async getPersonsList(
    sortBy: SortBy,
    sortDir: SortDir,
    offset: number,
    limit: number,
  ): Promise<(string | null)[]> {
    limit -= 1; // redis hash begins with 0, while UI pagination with 1

    if (sortBy === SortBy.Age) {
      const idsByAge =
        sortDir === SortDir.ASC
          ? await this.redis.zrange(Collection.ByAge, offset, offset + limit)
          : await this.redis.zrevrange(
              Collection.ByAge,
              offset,
              offset + limit,
            );

      return this.fetchByIds(idsByAge);
    }

    const objectsByName =
      sortDir === SortDir.ASC
        ? await this.redis.zrange(Collection.ByName, offset, offset + limit)
        : await this.redis.zrevrange(Collection.ByName, offset, offset + limit);

    const idsByName = objectsByName.reduce((acc: string[], cur) => {
      const personWithId = JSON.parse(cur);
      acc.push(personWithId.id);

      return acc;
    }, []);

    return this.fetchByIds(idsByName);
  }

  async getSinglePerson(id: string) {
    return this.fetchByIds([id]);
  }

  private async fetchByIds(ids: string[]) {
    const promises = ids.map((id) => this.redis.hget(Collection.ById, id));

    const jsonResults = await Promise.all(promises);

    return jsonResults.map((json) => {
      return json ? JSON.parse(json) : json;
    });
  }

  async getPersonsCount() {
    const count = await this.redis.hlen(Collection.ById);

    console.debug('count', count);

    return count;
  }
}

export const peopleService = new PeopleService();
