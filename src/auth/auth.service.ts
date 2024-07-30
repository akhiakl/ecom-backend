import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@app/users/users.service';
import { LoginInput } from './dto/login.input';
import { CreateUserInput } from '@app/users/dto';
import bcrypt from 'bcrypt';
import { TokenService } from './token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  protected async generateTokens(userId: string) {
    const [
      { token: accessToken, expiresIn },
      { token: refreshToken, expiresIn: refreshTokenExpiresIn },
    ] = await Promise.all([
      this.tokenService.generateAccessToken(userId),
      this.tokenService.generateRefreshToken(userId),
    ]);
    return {
      accessToken,
      refreshToken,
      expiresIn,
      refreshTokenExpiresIn,
    };
  }

  async signIn({ email, password }: LoginInput) {
    const { password: userPassword, ...user } =
      await this.usersService.findOneByEmail(email);
    const isMatch = await bcrypt.compare(password, userPassword);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const tonkenData = await this.generateTokens(user.id);
    return {
      user,
      ...tonkenData,
    };
  }

  async refreshToken(token: string) {
    const payload = await this.tokenService.verifyRefreshToken(token);
    const tonkenData = await this.generateTokens(payload.sub);
    await this.tokenService.revokeRefreshToken(token);
    return tonkenData;
  }

  async revokeToken(token: string) {
    return this.tokenService.revokeRefreshToken(token);
  }

  async register(input: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(input.password, 12);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = await this.usersService.create({
      ...input,
      password: hashedPassword,
    });
    const tonkenData = await this.generateTokens(user.id);
    return {
      user,
      ...tonkenData,
    };
  }
}
