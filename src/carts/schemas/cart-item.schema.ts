import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { BaseSchema } from '@app/schemas';

@Schema({ timestamps: true })
@ObjectType()
export class CartItem extends BaseSchema {
  @Prop({ required: true })
  @Field()
  itemId: string;

  @Prop({ required: true })
  @Field(() => Int)
  quantity: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Cart', required: true })
  cartId: string;
}

export type CartItemDocument = HydratedDocument<CartItem>;
export const CartItemSchema = SchemaFactory.createForClass(CartItem);
