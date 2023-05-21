import { ObjectType, Field } from '@nestjs/graphql';
import { BaseSchema } from '@app/schemas';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Review extends BaseSchema {
  @Prop()
  @Field()
  text: string;

  @Prop()
  @Field()
  rating: number;

  @Prop({ nullable: true })
  @Field({ nullable: true })
  productId?: string;

  @Prop()
  @Field()
  userId: string;
}
