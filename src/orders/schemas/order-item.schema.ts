import { Order } from './order.schema';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseSchema } from '@app/schemas';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class OrderItem extends BaseSchema {
  @Prop()
  @Field()
  productId: string;

  @Prop()
  @Field()
  quantity: number;

  @Field(() => Order)
  order: Order;
}
