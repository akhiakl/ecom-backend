import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from './product.schema';

export type OrderItemDocument = OrderItem & Document;

@Schema()
export class OrderItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop()
  quantity: number;

  @Prop()
  extra?: any;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
