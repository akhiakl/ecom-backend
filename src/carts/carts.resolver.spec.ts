import { Test, TestingModule } from '@nestjs/testing';
import { CartsResolver } from './carts.resolver';
import { CartsService } from './carts.service';
import { Cart } from './models';
import { repositoryMockFactory } from '@app/test-utils/mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CartsResolver', () => {
  let resolver: CartsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartsResolver,
        CartsService,
        {
          provide: getRepositoryToken(Cart),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    resolver = module.get<CartsResolver>(CartsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
