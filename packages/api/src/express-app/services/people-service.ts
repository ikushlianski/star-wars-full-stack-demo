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

    const idsByName =
      sortDir === SortDir.ASC
        ? await this.redis.zrange(Collection.ByName, offset, offset + limit)
        : await this.redis.zrevrange(Collection.ByName, offset, offset + limit);

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
}

export const peopleService = new PeopleService();
