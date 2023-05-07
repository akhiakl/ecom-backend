import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: string, user: Partial<User>): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
