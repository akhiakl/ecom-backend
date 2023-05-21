import { ObjectType, Field } from '@nestjs/graphql';
import { BaseSchema } from '@app/schemas';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Product extends BaseSchema {
  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  description: string;

  @Prop()
  @Field()
  price: number;
}
