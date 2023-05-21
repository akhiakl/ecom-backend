import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCartInput,
  CartPaginatedResponse,
  UpdateCartInput,
} from '../dto';
import { Cart, CartDocument, CartItem } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) { }

  private async findByIdWithExeption(id: string): Promise<CartDocument> {
    const cart = await this.cartModel.findById(id).populate('items').exec();
    if (!cart) {
      throw new NotFoundException(`Cart with ID '${id}' not found`);
    }
    return cart;
  }

  async create(createCartInput?: CreateCartInput): Promise<Cart> {
    const cart = new this.cartModel(createCartInput);
    await cart.save();
    return cart;
  }

  async findAll(page: number, limit: number): Promise<CartPaginatedResponse> {
    const [carts, count] = await Promise.all([
      this.cartModel
        .find()
        .limit(limit)
        .skip((page - 1) * limit)
        .populate('items')
        .exec(),
      this.cartModel.countDocuments().exec(),
    ]);
    const hasNextPage = count / limit < page;
    return {
      items: carts,
      total: count,
      hasNextPage,
    };
  }

  async findById(id: string): Promise<Cart> {
    return this.findByIdWithExeption(id);
  }

  async update(id: string, updateCartInput: UpdateCartInput): Promise<Cart> {
    const cart = await this.findByIdWithExeption(id);
    cart.name = updateCartInput.name ?? cart.name;
    return cart.save();
  }

  async remove(id: string): Promise<Cart> {
    const cart = await this.findByIdWithExeption(id);
    cart.deletedAt = new Date();
    return cart.save();
  }
}
