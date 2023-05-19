import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartsService } from './carts.service';
import { Cart } from './entities';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';

@Resolver(() => Cart)
export class CartsResolver {
  constructor(private readonly cartsService: CartsService) {}

  @Mutation(() => Cart)
  createCart(
    @Args('input', { nullable: true }) createCartInput?: CreateCartInput,
  ) {
    return this.cartsService.create(createCartInput);
  }

  @Query(() => [Cart], { name: 'carts' })
  getAllCarts() {
    return this.cartsService.findAll();
  }

  @Query(() => Cart, { name: 'cart' })
  getCartById(@Args('id') id: string) {
    return this.cartsService.findById(id);
  }

  @Mutation(() => Cart)
  updateCart(@Args('input') updateCartInput: UpdateCartInput) {
    return this.cartsService.update(updateCartInput.id, updateCartInput);
  }

  @Mutation(() => Cart)
  removeCart(@Args('id') id: string) {
    return this.cartsService.remove(id);
  }
}
