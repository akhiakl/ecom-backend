import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsResolver } from './carts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]), // import the repository
  ],
  providers: [CartsResolver, CartsService],
})
export class CartsModule {}
