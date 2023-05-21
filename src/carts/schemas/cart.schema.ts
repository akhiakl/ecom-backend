import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseSchema } from '@app/schemas';
import { CartItem } from './cart-item.schema';

@Schema({ timestamps: true })
@ObjectType()
export class Cart extends BaseSchema {
  @Prop()
  @Field({ nullable: true })
  name?: string;

  @Prop()
  @Field({ nullable: true })
  userId?: string;

  @Field(() => [CartItem], { nullable: true })
  items: CartItem[];
}

const CartSchema = SchemaFactory.createForClass(Cart);

CartSchema.virtual('items', {
  ref: CartItem.name,
  localField: '_id',
  foreignField: 'cartId',
});

export type CartDocument = HydratedDocument<Cart>;
export { CartSchema };
