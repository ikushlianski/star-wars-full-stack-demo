import RedisClient, { Redis } from 'ioredis';
import { SortBy } from '../enums/sort-by';
import { Collection } from '../enums/collection';
import { SortDir } from '../enums/sort-dir';

class PeopleService {
  redis: Redis;

  constructor() {
    this.redis = new RedisClient();
  }

  async get(sortBy: SortBy, sortDir: SortDir, offset: number, limit: number) {
    if (sortBy === SortBy.Age) {
      return sortDir === SortDir.ASC
        ? await this.redis.zrange(Collection.ByAge, offset, offset + limit)
        : await this.redis.zrevrange(Collection.ByAge, offset, offset + limit);
    }

    return sortDir === SortDir.ASC
      ? await this.redis.zrange(Collection.ByName, offset, offset + limit)
      : await this.redis.zrevrange(Collection.ByName, offset, offset + limit);
  }
}

export const peopleService = new PeopleService();
