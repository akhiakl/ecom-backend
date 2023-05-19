import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { NotFoundException } from '@nestjs/common';
import { getRandomMockCart, getRepositoryMock } from '@app/test-utils';

describe('CartsService', () => {
  let service: CartsService;
  let cartsRepository: Repository<Cart>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartsService, getRepositoryMock(Cart)],
    }).compile();

    service = module.get<CartsService>(CartsService);
    cartsRepository = module.get<Repository<Cart>>(getRepositoryToken(Cart));
  });

  describe('create', () => {
    it('should create a new cart and return it', async () => {
      const input: CreateCartInput = {
        name: 'Test Cart',
      };
      const expectedCart: Cart = getRandomMockCart(input);

      jest.spyOn(cartsRepository, 'save').mockResolvedValue(expectedCart);

      const result = await service.create(input);

      expect(result).toEqual(expectedCart);
      expect(cartsRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(input),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of carts', async () => {
      const expectedCarts: Cart[] = [getRandomMockCart(), getRandomMockCart()];

      jest.spyOn(cartsRepository, 'find').mockResolvedValue(expectedCarts);

      const result = await service.findAll();

      expect(result).toEqual(expectedCarts);
      expect(cartsRepository.find).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should find and return a cart by its ID', async () => {
      const id = '6466727d4d15b6b7672016a7';
      const expectedCart: Cart = getRandomMockCart({ id });

      jest.spyOn(cartsRepository, 'findOneBy').mockResolvedValue(expectedCart);

      const result = await service.findById(id);

      expect(result).toEqual(expectedCart);
      expect(cartsRepository.findOneBy).toHaveBeenCalledWith({
        _id: expect.any(Object),
      });
    });

    it('should throw NotFoundException if the cart is not found', async () => {
      const id = '6466727d4d15b6b7672016a7';

      jest.spyOn(cartsRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(service.findById(id)).rejects.toThrowError(
        NotFoundException,
      );
      expect(cartsRepository.findOneBy).toHaveBeenCalledWith({
        _id: expect.any(Object),
      });
    });
  });

  describe('update', () => {
    it('should update and return the updated cart', async () => {
      const id = '6466727d4d15b6b7672016a7';
      const input: UpdateCartInput = {
        id,
        name: 'Updated Cart',
      };
      const existingCart: Cart = getRandomMockCart({ id, name: input.name });
      const updatedCart: Cart = {
        ...existingCart,
        name: 'Updated Cart',
        // set any other updated properties
      };

      jest.spyOn(service, 'findById').mockResolvedValue(existingCart);
      jest.spyOn(cartsRepository, 'save').mockResolvedValue(updatedCart);

      const result = await service.update(id, input);

      expect(result).toEqual(updatedCart);
      expect(service.findById).toHaveBeenCalledWith(id);
      expect(cartsRepository.save).toHaveBeenCalledWith(updatedCart);
    });

    it('should throw NotFoundException if the cart is not found', async () => {
      const id = '6466727d4d15b6b7672016a7';
      const input: UpdateCartInput = {
        id,
        name: 'Updated Cart',
      };

      jest.spyOn(service, 'findById').mockImplementation(() => {
        throw new NotFoundException(
          `Cart with ID '6466727d4d15b6b7672016a7' not found`,
        );
      });

      await expect(service.update(id, input)).rejects.toThrowError(
        NotFoundException,
      );
      expect(service.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('remove', () => {
    it('should set the deletedAt property and return the removed cart', async () => {
      const id = '6466727d4d15b6b7672016a7';
      const existingCart: Cart = getRandomMockCart({ id });
      const removedCart: Cart = getRandomMockCart({
        ...existingCart,
        deletedAtAvailable: true,
      });
      jest.spyOn(service, 'findById').mockResolvedValue(existingCart);
      jest.spyOn(cartsRepository, 'save').mockResolvedValue(removedCart);

      const result = await service.remove(id);

      expect(result).toEqual(removedCart);
      expect(service.findById).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if the cart is not found', async () => {
      const id = '6466727d4d15b6b7672016a7';

      jest.spyOn(service, 'findById').mockImplementation(() => {
        throw new NotFoundException(
          `Cart with ID '6466727d4d15b6b7672016a7' not found`,
        );
      });

      await expect(service.remove(id)).rejects.toThrowError(NotFoundException);
      expect(service.findById).toHaveBeenCalledWith(id);
    });
  });
});
