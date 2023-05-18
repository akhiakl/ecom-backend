import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCartInput {
  @Field(() => Int, {
    nullable: true,
    description: 'The ID of the user who owns the cart.',
  })
  userId?: string;

  @Field(() => String, { nullable: true, description: 'The name of the cart.' })
  name?: string;
}
