import { Field, InterfaceType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@InterfaceType()
export class CreateExtraInput {
  @Field(() => JSON, { nullable: true })
  extra?: Record<string, any>;
}
