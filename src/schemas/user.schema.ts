import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Order, OrderSchema } from './order.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: OrderSchema }] })
  orders: Order[];

  @Prop()
  extra?: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
