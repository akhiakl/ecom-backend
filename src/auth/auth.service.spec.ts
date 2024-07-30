import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { TokenService } from './token/token.service';
import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@app/users/users.service';
import bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: TokenService,
          useValue: {
            generateAccessToken: jest.fn(),
            generateRefreshToken: jest.fn().mockResolvedValue({
              refreshToken: 'refreshToken',
              expiresIn: 1234,
            }),
            verifyRefreshToken: jest.fn(),
            revokeRefreshToken: jest.fn(),
          },
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    tokenService = module.get<TokenService>(TokenService);
  });

  describe('signIn', () => {
    it('should sign in a user and return tokens', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'password';
      const user = {
        id: '123',
        email,
        name: { firstname: 'John', lastname: 'Doe' },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const hashedPassword = 'hashed-password';

      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue({
        ...user,
        password: hashedPassword,
      });
      jest.spyOn(tokenService, 'generateAccessToken').mockResolvedValue({
        token: 'accessToken',
        expiresIn: 1234,
      });
      jest.spyOn(tokenService, 'generateRefreshToken').mockResolvedValue({
        token: 'refreshToken',
        expiresIn: 1234,
      });
      // Act
      const result = await authService.signIn({ email, password });

      // Assert
      expect(result).toEqual({
        user,
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        expiresIn: expect.any(Number),
        refreshTokenExpiresIn: expect.any(Number),
      });
      expect(usersService.findOneByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    });

    it('should throw an error when user not found', async () => {
      // Arrange
      const email = 'test@example.com';
      jest
        .spyOn(usersService, 'findOneByEmail')
        .mockResolvedValue({ password: 'NA', id: 'NA' } as any);

      // Act & Assert
      await expect(
        authService.signIn({ email, password: 'password' }),
      ).rejects.toThrow(UnauthorizedException);
      expect(usersService.findOneByEmail).toHaveBeenCalledWith(email);
    });

    it('should throw an error when password is incorrect', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'password';
      const user = {
        id: '123',
        email,
        name: { firstname: 'John', lastname: 'Doe' },
        password: 'silly123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(user);

      // Act & Assert
      await expect(authService.signIn({ email, password })).rejects.toThrow(
        UnauthorizedException,
      );
      expect(usersService.findOneByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
    });
  });

  describe('refreshToken', () => {
    it('should refresh the tokens', async () => {
      // Arrange
      const token = 'fake-token';
      const payload = { sub: '123', type: 'refresh' };
      jest.spyOn(tokenService, 'verifyRefreshToken').mockResolvedValue(payload);
      jest.spyOn(authService as any, 'generateTokens').mockResolvedValue({
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
        expiresIn: 3600,
        refreshTokenExpiresIn: 86400,
      });

      // Act
      const result = await authService.refreshToken(token);

      // Assert
      expect(result).toEqual({
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
        expiresIn: 3600,
        refreshTokenExpiresIn: 86400,
      });
      expect(tokenService.verifyRefreshToken).toHaveBeenCalledWith(token);
      expect((authService as any).generateTokens).toHaveBeenCalledWith('123');
    });

    it('should throw an error when verifying the refresh token fails', async () => {
      // Arrange
      const token = 'fake-token';
      jest
        .spyOn(tokenService, 'verifyRefreshToken')
        .mockRejectedValue(new UnauthorizedException());

      // Act & Assert
      await expect(authService.refreshToken(token)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(tokenService.verifyRefreshToken).toHaveBeenCalledWith(token);
    });
  });

  describe('register', () => {
    it('should register a new user and return tokens', async () => {
      // Arrange
      const input = {
        email: 'test@example.com',
        name: { firstname: 'John', lastname: 'Doe' },
        password: 'password',
      };
      const hashedPassword = 'hashed-password';
      const password = 'password';
      const user = {
        id: '123',
        email: input.email,
        name: { firstname: 'John', lastname: 'Doe' },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(usersService, 'create')
        .mockResolvedValue({ password, ...user });
      jest.spyOn(tokenService, 'generateAccessToken').mockResolvedValue({
        token: 'accessToken',
        expiresIn: 1234,
      });
      jest.spyOn(tokenService, 'generateRefreshToken').mockResolvedValue({
        token: 'refreshToken',
        expiresIn: 1234,
      });
      // Act
      const result = await authService.register(input);

      // Assert
      expect(result).toEqual({
        user,
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        expiresIn: expect.any(Number),
        refreshTokenExpiresIn: expect.any(Number),
      });
      expect(usersService.create).toHaveBeenCalledWith({
        ...input,
        password: hashedPassword,
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(input.password, 12);
    });
  });

  describe('revokeToken', () => {
    it('should revoke the refresh token', async () => {
      // Arrange
      const token = 'fake-token';
      jest.spyOn(tokenService, 'revokeRefreshToken').mockResolvedValue(true);

      // Act
      const result = await authService.revokeToken(token);

      // Assert
      expect(result).toBe(true);
      expect(tokenService.revokeRefreshToken).toHaveBeenCalledWith(token);
    });

    it('should throw an error when revoking an invalid token', async () => {
      // Arrange
      const token = 'invalid-token';
      jest
        .spyOn(tokenService, 'revokeRefreshToken')
        .mockRejectedValue(new UnauthorizedException());

      // Act & Assert
      await expect(authService.revokeToken(token)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(tokenService.revokeRefreshToken).toHaveBeenCalledWith(token);
    });
  });
});
