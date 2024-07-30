import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { TokenInput } from './dto/token.input';
import { AuthPayload } from './entities/auth-payload.model';
import { TokenPayload } from './entities/token-payload.model';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '@app/users/models';

const mockedUser: Omit<User, 'password'> = {
  id: '123',
  name: { firstname: 'John', lastname: 'Doe' },
  email: 'test@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
            register: jest.fn(),
            refreshToken: jest.fn(),
            revokeToken: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    it('should call authService.signIn with correct parameters', async () => {
      const loginInput: LoginInput = {
        email: 'test@example.com',
        password: 'password',
      };
      const expectedResult: AuthPayload = {
        accessToken: 'access',
        refreshToken: 'refresh',
        user: mockedUser,
        expiresIn: 0,
        refreshTokenExpiresIn: 0,
        tokenType: 'Bearer',
      };

      jest.spyOn(authService, 'signIn').mockResolvedValue(expectedResult);

      const result = await resolver.signIn(loginInput);
      expect(result).toEqual(expectedResult);
      expect(authService.signIn).toHaveBeenCalledWith(loginInput);
    });

    it('should throw UnauthorizedException if signIn fails', async () => {
      const loginInput: LoginInput = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      jest
        .spyOn(authService, 'signIn')
        .mockRejectedValue(new UnauthorizedException());

      await expect(resolver.signIn(loginInput)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('register', () => {
    it('should call authService.register with correct parameters', async () => {
      const registerInput: RegisterInput = {
        email: mockedUser.email,
        password: 'password',
        name: mockedUser.name,
      };
      const expectedResult: AuthPayload = {
        accessToken: 'access',
        refreshToken: 'refresh',
        user: mockedUser,
        expiresIn: 0,
        refreshTokenExpiresIn: 0,
        tokenType: 'Bearer',
      };
      jest.spyOn(authService, 'register').mockResolvedValue(expectedResult);

      const result = await resolver.register(registerInput);
      expect(result).toEqual(expectedResult);
      expect(authService.register).toHaveBeenCalledWith(registerInput);
    });
  });

  describe('refreshToken', () => {
    it('should call authService.refreshToken with correct parameters', async () => {
      const tokenInput: TokenInput = { refreshToken: 'refresh' };
      const expectedResult: TokenPayload = {
        accessToken: 'newAccess',
        refreshToken: 'newRefresh',
        expiresIn: 0,
        refreshTokenExpiresIn: 0,
        tokenType: 'Bearer',
      };

      jest.spyOn(authService, 'refreshToken').mockResolvedValue(expectedResult);

      const result = await resolver.refreshToken(tokenInput);
      expect(result).toEqual(expectedResult);
      expect(authService.refreshToken).toHaveBeenCalledWith(
        tokenInput.refreshToken,
      );
    });
  });

  describe('revokeToken', () => {
    it('should call authService.revokeToken with correct parameters', async () => {
      const tokenInput: TokenInput = { refreshToken: 'refresh' };
      const expectedResult = true;

      jest.spyOn(authService, 'revokeToken').mockResolvedValue(expectedResult);

      const result = await resolver.revokeToken(tokenInput);
      expect(result).toEqual(expectedResult);
    });
  });
});
