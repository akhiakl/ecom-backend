import { Test, TestingModule } from '@nestjs/testing';
import { CartsResolver } from './carts.resolver';
import { Cart } from '../schemas';
import { getRandomMockCart, getRepositoryMock } from '@app/test-utils';
import { CartsService } from '../services/carts.service';

describe('CartsResolver', () => {
  let resolver: CartsResolver;
  let service: CartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartsResolver, CartsService, getRepositoryMock(Cart)],
    }).compile();

    resolver = module.get<CartsResolver>(CartsResolver);
    service = module.get<CartsService>(CartsService);
  });

  describe('createCart', () => {
    it('should call create method with provided input and return the created entity', async () => {
      const input = {
        name: 'test',
      };
      const expectedResult = getRandomMockCart({ name: input.name });
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      expect(await resolver.createCart(input)).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith(input);
    });

    it('should throw an error if service throws an exception', async () => {
      const input = {
        name: 'test',
      };
      const expectedError = new Error('Failed to create cart');
      jest.spyOn(service, 'create').mockRejectedValue(expectedError);

      await expect(resolver.createCart(input)).rejects.toThrow(expectedError);
      expect(service.create).toHaveBeenCalledWith(input);
    });
  });

  describe('getCartById', () => {
    it('should call findOne method with provided id and return the found entity', async () => {
      const id = '12dft322';
      const expectedResult = getRandomMockCart({ id });
      jest.spyOn(service, 'findById').mockResolvedValue(expectedResult);

      expect(await resolver.getCartById(id)).toBe(expectedResult);
      expect(service.findById).toHaveBeenCalledWith(id);
    });

    it('should throw an error if service throws an exception', async () => {
      const id = '12dft322';
      const expectedError = new Error(`Failed to find cart with id ${id}`);
      jest.spyOn(service, 'findById').mockRejectedValue(expectedError);

      await expect(resolver.getCartById(id)).rejects.toThrow(expectedError);
      expect(service.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('getAllCarts', () => {
    it('should call findAll method and return the array of found entities', async () => {
      const expectedResults = {
        items: [getRandomMockCart(), getRandomMockCart()],
        total: 2,
        hasNextPage: false,
      };
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResults);

      expect(await resolver.getAllCarts()).toBe(expectedResults);
      expect(service.findAll).toHaveBeenCalledWith();
    });

    it('should return an empty array if no carts are found', async () => {
      const expectedResults = {
        items: [],
        total: 0,
        hasNextPage: false,
      };
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResults);

      expect(await resolver.getAllCarts()).toBe(expectedResults);
      expect(service.findAll).toHaveBeenCalledWith();
    });
  });

  describe('updateCart', () => {
    it('should call update method with provided input and return the updated entity', async () => {
      const id = '12dft322';
      const input = {
        id,
        name: 'test3',
      };
      const expectedResult = getRandomMockCart({ id, name: input.name });

      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

      expect(await resolver.updateCart(input)).toBe(expectedResult);
      expect(service.update).toHaveBeenCalledWith(id, input);
    });

    it('should throw an error if service throws an exception', async () => {
      const id = '12dft322';
      const input = {
        id,
        name: 'test3',
      };
      const expectedError = new Error(
        `Failed to update cart with id ${input.id}`,
      );
      jest.spyOn(service, 'update').mockRejectedValue(expectedError);

      await expect(resolver.updateCart(input)).rejects.toThrow(expectedError);
      expect(service.update).toHaveBeenCalledWith(id, input);
    });
  });

  describe('removeCart', () => {
    it('should call delete method with provided id and return true', async () => {
      const id = '12dft322';
      const expectedResult = getRandomMockCart({ id });

      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

      expect(await resolver.removeCart(id)).toBe(expectedResult);
      expect(await resolver.removeCart(id)).toBe(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(id);
    });

    it('should throw an error if service throws an exception', async () => {
      const id = '12dft322';
      const expectedError = new Error(`Failed to remove cart with id ${id}`);
      jest.spyOn(service, 'remove').mockRejectedValue(expectedError);

      await expect(resolver.removeCart(id)).rejects.toThrow(expectedError);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
