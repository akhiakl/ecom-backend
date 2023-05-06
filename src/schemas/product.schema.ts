import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Review } from './review.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.Decimal128, precision: 10, scale: 2 })
  price: number;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  extra?: any;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews?: Review[];

  @Prop()
  imageUrl?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
