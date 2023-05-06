import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';
import { OrderItem, OrderItemSchema } from './order-item.schema';
import * as mongoose from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: [{ type: OrderItemSchema }] })
  orderItems: OrderItem[];

  @Prop({ type: mongoose.Schema.Types.Decimal128, precision: 10, scale: 2 })
  totalPrice: number;

  @Prop()
  shippingAddress: string;

  @Prop()
  status: string;

  @Prop()
  paymentMethod: string;

  @Prop({ type: Date })
  paymentDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  extra?: any;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
