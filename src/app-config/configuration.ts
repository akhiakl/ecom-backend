import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default () => ({
  database: {
    type: process.env.DATABASE_TYPE as TypeOrmModuleOptions['type'],
    url: process.env.DATABASE_URL,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  authentication: {
    accessToken: {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: Number(process.env.JWT_ACCESS_EXPIRATION),
    },
    refreshToken: {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: Number(process.env.JWT_REFRESH_EXPIRATION),
    },
  },
});
