import { Field, InputType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password?: string;

  @Field(() => JSON, { nullable: true })
  extra?: Record<string, any>;
}
