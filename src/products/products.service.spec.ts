import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { repositoryMockFactory } from '@app/test-utils/mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './models';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
