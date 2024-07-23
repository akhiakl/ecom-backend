import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './models';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.productsService.findOne(id);
  }
}
