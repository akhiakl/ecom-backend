import { CreateExtraInput } from '@app/dto';
import { Int, Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCartItemInput extends CreateExtraInput {
  @Field()
  itemId: string;

  @Field(() => Int)
  quantity: number;
}
