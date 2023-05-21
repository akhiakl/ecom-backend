import { BaseSchema } from '@app/schemas';
import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class User extends BaseSchema {
  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  email: string;

  @Prop()
  password: string;
}
