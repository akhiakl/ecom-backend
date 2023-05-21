import { ObjectType, Field } from '@nestjs/graphql';
import { BaseSchema } from '@app/schemas';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Order extends BaseSchema {
  @Prop()
  @Field()
  userId: string;

  @Prop()
  @Field()
  status: string;
}
