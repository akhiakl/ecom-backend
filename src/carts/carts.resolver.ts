import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartsService } from './carts.service';
import { Cart } from './models';
import { CreateCartInput, UpdateCartInput } from './dto';

@Resolver(() => Cart)
export class CartsResolver {
  constructor(private readonly cartsService: CartsService) {}

  @Mutation(() => Cart)
  createCart(@Args('input') input: CreateCartInput) {
    return this.cartsService.create(input);
  }

  @Query(() => Cart, { name: 'cart' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.cartsService.findOne(id);
  }

  @Mutation(() => Cart)
  updateCart(@Args('input') input: UpdateCartInput) {
    return this.cartsService.update(input.id, input);
  }

  @Mutation(() => Cart)
  removeCart(@Args('id', { type: () => Int }) id: string) {
    return this.cartsService.delete(id);
  }
}
