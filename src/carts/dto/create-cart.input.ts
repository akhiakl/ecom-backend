import { CreateExtraInput } from '@app/dto';
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCartInput extends CreateExtraInput {
  @Field(() => Int, {
    nullable: true,
    description: 'ID of the user who owns the cart.',
  })
  userId?: string;

  @Field(() => String, { nullable: true, description: 'Name of the cart.' })
  name?: string;
}
