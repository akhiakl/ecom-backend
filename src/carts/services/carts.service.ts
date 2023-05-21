import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import {
  CreateCartInput,
  CartPaginatedResponse,
  UpdateCartInput,
} from '../dto';
import { Cart, CartItem } from '../entities';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: MongoRepository<Cart>,
    @InjectRepository(CartItem)
    private cartItemsRepository: MongoRepository<CartItem>,
  ) { }

  async create(createCartInput?: CreateCartInput): Promise<Cart> {
    const cart = new Cart();
    cart.name = createCartInput?.name;
    cart.userId = createCartInput?.userId;
    // set any other properties as required
    return this.cartsRepository.save(cart);
  }

  async findAll(page: number, limit: number): Promise<CartPaginatedResponse> {
    const [carts, count] = await this.cartsRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      relations: {
        items: true,
      },
    });
    const hasNextPage = count / limit < page;
    return {
      items: carts,
      total: count,
      hasNextPage,
    };
  }

  async findById(id: string): Promise<Cart> {
    const cart = await this.cartsRepository
      .aggregate([
        {
          $lookup: {
            from: 'cart_item',
            localField: '_id',
            foreignField: 'cartId',
            as: 'items',
          },
        },
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $addFields: {
            id: '$_id',
            'items.id': { $getField: 'items.$._id' },
          },
        },
      ])
      .toArray();

    console.log(JSON.stringify(cart, null, 2));

    if (!cart) {
      throw new NotFoundException(`Cart with ID '${id}' not found`);
    }
    return cart[0];
  }

  async update(id: string, updateCartInput: UpdateCartInput): Promise<Cart> {
    const cart = await this.findById(id);
    cart.name = updateCartInput.name ?? cart.name;
    return this.cartsRepository.save(cart);
  }

  async remove(id: string): Promise<Cart> {
    const cart = await this.findById(id);
    cart.deletedAt = new Date();
    return this.cartsRepository.save(cart);
  }
}
