import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CartItemsService } from '../services/cart-items.service';
import { Cart, CartItem } from '../entities';
import { AddItemsToCartInput } from '../dto';

@Resolver(() => CartItem)
export class CartItemsResolver {
  constructor(private readonly cartItemsService: CartItemsService) { }

  @Mutation(() => Cart)
  addItemsToCart(@Args('input') input: AddItemsToCartInput) {
    return this.cartItemsService.createOrUpdate(input);
  }

  // @Mutation(() => CartItem)
  // updateCartItems(@Args('input') input: UpdateCartItemsInput) {
  //   return this.cartItemsService.update(input.id, input);
  // }

  // @Mutation(() => CartItem)
  // removeItemFromCart(
  //   @Args('cartId', { type: () => Int }) cartId: number,
  //   @Args('cartItemId', { type: () => Int }) cartItemId: number,
  // ) {
  //   return this.cartItemsService.remove(cartId, cartItemId);
  // }
}
