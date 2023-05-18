import { CreateCartInput } from './create-cart.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCartInput extends PartialType(CreateCartInput) {
  @Field({ description: 'The ID of the cart.' })
  id: string;
}
