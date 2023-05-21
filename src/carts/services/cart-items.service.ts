import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CartItem } from '../entities/cart-item.entity';
import { Cart } from '../entities';
import { CartsService } from './carts.service';
import { AddItemsToCartInput } from '../dto';
import { ObjectId } from 'mongodb';
@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemsRepository: MongoRepository<CartItem>,
    private readonly cartsService: CartsService,
  ) { }

  async createOrUpdate({ cartId, items }: AddItemsToCartInput): Promise<Cart> {
    const existingItems = await this.cartItemsRepository.find({
      where: {
        cartId: new ObjectId(cartId),
      },
    });
    const cartItems = [];
    for (const item of items) {
      const existingitemIndex = existingItems.findIndex(
        (eItem) => item.itemId === eItem.itemId,
      );
      console.log({ existingitemIndex }, { existingItems });

      if (existingitemIndex === -1) {
        cartItems.push(
          this.cartItemsRepository.create({
            ...item,
            cartId: new ObjectId(cartId),
          }),
        );
      } else {
        const existingItem = existingItems[existingitemIndex];
        existingItem.quantity += item.quantity;
        cartItems.push(existingItem);
      }
    }
    console.log(cartItems, null, 2);

    await this.cartItemsRepository.save(cartItems);
    return this.cartsService.findById(cartId);
  }
}
