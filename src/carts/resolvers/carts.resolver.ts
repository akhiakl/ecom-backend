import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaginatedArgs } from '@app/dto';
import {
  CreateCartInput,
  CartPaginatedResponse,
  UpdateCartInput,
} from '../dto';
import { Cart } from '../entities';
import { CartsService } from '../services/carts.service';

@Resolver(() => Cart)
export class CartsResolver {
  constructor(private readonly cartsService: CartsService) { }

  @Mutation(() => Cart, {
    description: 'Create an empty cart with optional name and userId',
  })
  createCart(
    @Args('input', {
      nullable: true,
    })
    createCartInput?: CreateCartInput,
  ) {
    return this.cartsService.create(createCartInput);
  }

  @Query(() => CartPaginatedResponse, {
    name: 'carts',
    description:
      'Retrieve all active carts. Can be paginated using page and limit arguments.',
  })
  getAllCarts(@Args() args?: PaginatedArgs): Promise<CartPaginatedResponse> {
    const { limit, page } = args;
    return this.cartsService.findAll(page, limit);
  }

  @Query(() => Cart, {
    name: 'cart',
    description: 'Retrieve a cart by ID.',
  })
  getCartById(@Args('id') id: string) {
    return this.cartsService.findById(id);
  }

  @Mutation(() => Cart, {
    description: 'Update a cart by ID',
  })
  updateCart(@Args('input') updateCartInput: UpdateCartInput) {
    return this.cartsService.update(updateCartInput.id, updateCartInput);
  }

  @Mutation(() => Cart, {
    description: 'Remove a cart by ID',
  })
  removeCart(@Args('id') id: string) {
    return this.cartsService.remove(id);
  }
}
