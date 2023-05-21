import { ObjectType, Field } from '@nestjs/graphql';
import JSON from 'graphql-type-json';
import { BaseSchema } from './base.schema';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Image extends BaseSchema {
  @Prop()
  @Field()
  filename: string;

  @Prop({ type: 'object' })
  @Field(() => JSON)
  meta: Record<string, any>;
}
