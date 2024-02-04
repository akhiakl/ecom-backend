import { Injectable } from '@nestjs/common';
import { Cart } from './models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartInput, UpdateCartInput } from './dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
  ) { }

  async findOne(id: string): Promise<Cart> {
    return this.cartRepository.findOne({ where: { id } });
  }

  async create(user: CreateCartInput): Promise<Cart> {
    return this.cartRepository.save(user);
  }

  async update(id: string, user: UpdateCartInput): Promise<void> {
    await this.cartRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.cartRepository.delete(id);
  }
}
