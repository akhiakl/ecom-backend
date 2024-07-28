import { AppConfigService } from '@app/app-config/app-config.service';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from '@redis/client';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  constructor(private configService: AppConfigService) {}
  private redisClient: RedisClientType;

  async onModuleInit() {
    this.redisClient = createClient({
      url: this.configService.redis.url,
    });
    this.redisClient.on('error', (err) => {
      console.error('Redis error:', err);
    });
    await this.redisClient.connect();
  }

  async onModuleDestroy() {
    await this.redisClient.quit();
  }

  get client() {
    return this.redisClient;
  }
}
