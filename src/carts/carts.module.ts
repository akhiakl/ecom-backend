import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsResolver } from './carts.resolver';
import { Cart } from './models';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [CartsResolver, CartsService],
  imports: [TypeOrmModule.forFeature([Cart])],
})
export class CartsModule { }
