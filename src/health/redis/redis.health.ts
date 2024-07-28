import { Injectable, Scope } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import {
  isNullish,
  parseUsedMemory,
  promiseTimeout,
  removeLineBreaks,
} from './utils';
import { RedisCheckSettings } from './redis-check-settings.interface';
import { ABNORMALLY_MEMORY_USAGE } from './messages';
import { RedisService } from '@app/cache/redis/redis.service';
import { createClient, RedisClientType } from '@redis/client';
import { AppConfigService } from '@app/app-config/app-config.service';
/**
 * The RedisHealthIndicator is used for health checks related to redis.
 *
 * @public
 */
@Injectable({ scope: Scope.TRANSIENT })
export class RedisHealthIndicator extends HealthIndicator {
  private redisClient: RedisClientType;

  constructor(private configService: AppConfigService) {
    super();
    this.redisClient = createClient({
      url: this.configService.redis.url,
    });
    this.redisClient.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }

  /**
   * Checks a redis/cluster connection.
   *
   * @param key - The key which will be used for the result object
   * @param options - The extra options for check
   */
  async checkHealth(
    key: string,
    options: RedisCheckSettings,
  ): Promise<HealthIndicatorResult> {
    let isHealthy = false;

    try {
      await promiseTimeout(options.timeout ?? 1000, this.redisClient.connect());
      await promiseTimeout(options.timeout ?? 1000, this.redisClient.ping());
      if (!isNullish(options.memoryThreshold)) {
        const info = await this.redisClient.info('memory');
        if (parseUsedMemory(removeLineBreaks(info)) > options.memoryThreshold) {
          throw new Error(ABNORMALLY_MEMORY_USAGE);
        }
      }

      isHealthy = true;
    } catch (e) {
      const { message } = e as Error;
      throw new HealthCheckError(
        message,
        this.getStatus(key, isHealthy, { message }),
      );
    }

    return this.getStatus(key, isHealthy);
  }
}
