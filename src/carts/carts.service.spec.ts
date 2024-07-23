import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';
import { Cart } from './models';
import { repositoryMockFactory } from '@app/test-utils/mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CartsService', () => {
  let service: CartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartsService,
        {
          provide: getRepositoryToken(Cart),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
