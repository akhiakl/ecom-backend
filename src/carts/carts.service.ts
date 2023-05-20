import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { ObjectId } from 'mongodb';
import { CartPaginatedResponse } from './dto/paginated-cart.response';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
  ) { }

  async create(createCartInput?: CreateCartInput): Promise<Cart> {
    const cart = new Cart();
    cart.name = createCartInput?.name;
    cart.userId = createCartInput?.userId;
    // set any other properties as required
    return this.cartsRepository.save(cart);
  }

  async findAll(page: number, limit: number): Promise<CartPaginatedResponse> {
    const count = await this.cartsRepository.count();
    const carts = await this.cartsRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
    const hasNextPage = count / limit < page;
    return {
      items: carts,
      total: count,
      hasNextPage,
    };
  }

  async findById(id: string): Promise<Cart> {
    const cart = await this.cartsRepository.findOneBy({
      _id: new ObjectId(id),
    } as any);
    if (!cart) {
      throw new NotFoundException(`Cart with ID '${id}' not found`);
    }
    return cart;
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
