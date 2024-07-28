import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import configuration from './configuration';

type EnvironmentVariables = ReturnType<typeof configuration>;

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  get database() {
    return this.configService.get('database', { infer: true });
  }

  get authentication() {
    return this.configService.get('authentication', { infer: true });
  }

  get redis() {
    const { host, port } = this.configService.get('redis', { infer: true });
    if (!host && !port) return { url: undefined };
    return {
      url: `redis://${this.configService.get('redis.host', { infer: true })}:${this.configService.get('redis.port', { infer: true })}`,
    };
  }
}
