import { Module } from '@nestjs/common';
import { Cart, CartItem } from './entities';
import { CartsResolver } from './resolvers/carts.resolver';
import { CartsService } from './services/carts.service';
import { CartItemsResolver } from './resolvers/cart-items.resolver';
import { CartItemsService } from './services/cart-items.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem]), // import the repository
  ],
  providers: [CartsResolver, CartsService, CartItemsResolver, CartItemsService],
})
export class CartsModule { }
