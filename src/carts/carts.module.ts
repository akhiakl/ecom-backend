import { Module } from '@nestjs/common';
import { Cart, CartSchema, CartItem, CartItemSchema } from './schemas';
import { CartsResolver } from './resolvers/carts.resolver';
import { CartsService } from './services/carts.service';
import { CartItemsResolver } from './resolvers/cart-items.resolver';
import { CartItemsService } from './services/cart-items.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: CartItem.name, schema: CartItemSchema },
    ]),
  ],
  providers: [CartsResolver, CartsService, CartItemsResolver, CartItemsService],
})
export class CartsModule { }
