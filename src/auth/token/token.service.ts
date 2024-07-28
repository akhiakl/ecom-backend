import { AppConfigService } from '@app/app-config/app-config.service';
import { CacheService } from '@app/cache/cache.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

type TokenPayload = {
  sub: string;
  type: string;
  iat?: number;
  exp?: number;
  jti?: string;
};

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: AppConfigService,
    private cacheService: CacheService,
  ) {}

  protected generateRefreshTokenCacheKey(userId: string, jwtid: string) {
    return `user:${userId}:refresh-token:${jwtid}`;
  }

  protected generateRefreshTokenCacheTag(userId: string) {
    return `user:${userId}:refresh-token`;
  }

  async generateAccessToken(userId: string) {
    const payload = {
      sub: userId,
      type: 'access',
    };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.authentication.accessToken.secret,
      expiresIn: this.configService.authentication.accessToken.expiresIn,
    });
    return {
      token,
      expiresIn: this.configService.authentication.accessToken.expiresIn,
    };
  }

  async generateRefreshToken(userId: string) {
    const jwtid = randomUUID();
    const payload = {
      sub: userId,
      type: 'refresh',
    };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.authentication.refreshToken.secret,
      expiresIn: this.configService.authentication.refreshToken.expiresIn,
      jwtid,
    });

    const tokenKey = this.generateRefreshTokenCacheKey(userId, jwtid);
    await this.cacheService.setData({
      key: tokenKey,
      value: token,
      ttl: this.configService.authentication.refreshToken.expiresIn,
      tag: this.generateRefreshTokenCacheTag(userId),
    });

    return {
      token,
      expiresIn: this.configService.authentication.accessToken.expiresIn,
    };
  }

  async verifyRefreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<TokenPayload>(refreshToken, {
        secret: this.configService.authentication.refreshToken.secret,
      });

      const jwtid = payload.jti;
      const userId = payload.sub;
      const tokenKey = this.generateRefreshTokenCacheKey(userId, jwtid);
      const storedToken = await this.cacheService.getData(tokenKey);

      if (storedToken !== refreshToken) {
        throw new UnauthorizedException('Token has been revoked or is invalid');
      }
      return payload;
    } catch (err) {
      throw new UnauthorizedException('Token verification failed');
    }
  }

  async revokeRefreshToken(refreshToken: string) {
    const payload = this.jwtService.verify<TokenPayload>(refreshToken, {
      secret: this.configService.authentication.refreshToken.secret,
    });

    const jwtid = payload.jti;
    const userId = payload.sub;
    const tokenKey = this.generateRefreshTokenCacheKey(userId, jwtid);
    const status = await this.cacheService.removeData(tokenKey);
    return !!status;
  }
}
