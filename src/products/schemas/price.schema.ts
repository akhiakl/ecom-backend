import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from './product.schema';
import { BaseSchema } from '@app/schemas';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
@ObjectType()
export class Price extends BaseSchema {
  @Prop({ type: 'decimal', precision: 10, scale: 2 })
  @Field(() => Number)
  amount: number;

  @Prop()
  @Field()
  currency: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  product: Product;
}
