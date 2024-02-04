import { InputType, Field, ID } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@InputType()
export class CreateCartInput {
  @Field()
  userId: string;

  @Field(() => ID)
  productId: string;

  @Field(() => Number)
  quantity: number;

  @Field(() => JSON, { nullable: true })
  extra: Record<string, any>;
}
