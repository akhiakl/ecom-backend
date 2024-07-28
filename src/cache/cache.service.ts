import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RedisService } from './redis/redis.service';

type SetValOptions = {
  key: string;
  value: any;
};
type SetDataOptions = SetValOptions & {
  /** time in seconds */
  ttl?: number;
  tag?: string;
};

type SetHashOptions = SetValOptions & {
  field: string;
};

type GetHashOptions = {
  key: string;
  field: string;
};

@Injectable()
export class CacheService {
  constructor(private readonly redisService: RedisService) {}

  protected generateKey(type: 'tag' | 'data' | 'hash', key) {
    return `${type}:${key}`;
  }

  async setData({ key, value, tag, ttl }: SetDataOptions) {
    try {
      const promises: Promise<any>[] = [
        this.redisService.client.set(
          this.generateKey('data', key),
          JSON.stringify(value),
          {
            EX: ttl,
          },
        ),
      ];
      if (tag) {
        promises.push(
          this.redisService.client.sAdd(
            this.generateKey('tag', tag),
            this.generateKey('data', key),
          ),
        );
      }
      await Promise.all(promises);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error setting value in Redis');
    }
  }

  async getData(key: string) {
    try {
      const data = await this.redisService.client.get(
        this.generateKey('data', key),
      );
      return JSON.parse(data);
    } catch (error) {
      throw new InternalServerErrorException('Error getting value from Redis');
    }
  }

  async removeData(key: string) {
    try {
      return await this.redisService.client.del(this.generateKey('data', key));
    } catch (error) {
      throw new InternalServerErrorException('Error removing value from Redis');
    }
  }

  async setTag({ key, value }: SetValOptions) {
    try {
      return await this.redisService.client.sAdd(
        this.generateKey('tag', key),
        value,
      );
    } catch (error) {
      throw new InternalServerErrorException('Error finding objects by tag');
    }
  }

  async getTag(tag: string) {
    try {
      return await this.redisService.client.sMembers(
        this.generateKey('tag', tag),
      );
    } catch (error) {
      throw new InternalServerErrorException('Error finding objects by tag');
    }
  }

  async removeTag(tag: string) {
    try {
      await this.redisService.client.sRem(this.generateKey('tag', tag), '*');
      await this.redisService.client.del(this.generateKey('tag', tag));
    } catch (error) {
      throw new InternalServerErrorException('Error finding objects by tag');
    }
  }

  async setHash({ key, value, field }: SetHashOptions) {
    try {
      return await this.redisService.client.hSet(
        this.generateKey('hash', key),
        field,
        value,
      );
    } catch (error) {
      throw new InternalServerErrorException('Error finding objects by tag');
    }
  }

  async getHash({ key, field }: GetHashOptions) {
    try {
      return await this.redisService.client.hGet(
        this.generateKey('hash', key),
        field,
      );
    } catch (error) {
      throw new InternalServerErrorException('Error finding objects by tag');
    }
  }

  async removeHash(hash: string) {
    try {
      return await this.redisService.client.del(this.generateKey('hash', hash));
    } catch (error) {
      throw new InternalServerErrorException('Error finding objects by tag');
    }
  }
}
