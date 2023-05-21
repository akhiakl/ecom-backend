import { Injectable } from '@nestjs/common';
import { CartItem } from '../schemas/cart-item.schema';
import { CartsService } from './carts.service';
import { AddItemsToCartInput } from '../dto/add-items-to-cart.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from '../schemas';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectModel(CartItem.name) private cartItemModel: Model<CartItem>,
    private readonly cartsService: CartsService,
  ) { }

  async createOrUpdate({ cartId, items }: AddItemsToCartInput): Promise<Cart> {
    const cart = await this.cartsService.findById(cartId);

    const existingItems = cart.items;

    console.log({ existingItems });

    const updatedItems = [];
    const bulkOps = [];
    for (const item of items) {
      const existingIndex = existingItems.findIndex(
        (eItem) => eItem.itemId === item.itemId,
      );
      if (existingIndex === -1) {
        bulkOps.push({
          insertOne: {
            document: {
              ...item,
              cartId,
            },
          },
        });
      } else {
        bulkOps.push({
          updateOne: {
            filter: { _id: existingItems[existingIndex]._id },
            update: { $inc: { quantity: item.quantity } },
          },
        });
      }
    }

    await this.cartItemModel
      .bulkWrite(bulkOps, { ordered: false })
      .then((bulkWriteOpResult) => {
        console.log('BULK update OK');
        console.log(JSON.stringify(bulkWriteOpResult, null, 2));
      });

    return cart;
  }
}
