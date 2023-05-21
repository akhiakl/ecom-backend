import { Field, InputType } from '@nestjs/graphql';
import { CreateCartItemInput } from './create-cart-item.input';

@InputType()
export class AddItemsToCartInput {
  @Field(() => String, { description: 'Id of the cart.' })
  cartId: string;

  @Field(() => [CreateCartItemInput])
  items: CreateCartItemInput[];
}
