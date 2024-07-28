import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@app/users/users.module';
import { TokenService } from './token/token.service';
import { CacheModule } from '@app/cache/cache.module';

@Module({
  imports: [UsersModule, JwtModule.register({}), CacheModule],
  providers: [AuthService, AuthResolver, TokenService],
  exports: [AuthService],
})
export class AuthModule {}
