import { Field, ID, ObjectType } from '@nestjs/graphql';

import JSON from 'graphql-type-json';
import { Prop } from '@nestjs/mongoose';

@ObjectType()
export class BaseSchema extends Document {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  updatedAt?: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @Prop({ type: 'json' })
  @Field(() => JSON, { nullable: true })
  extra?: Record<string, any>;

  // Helper method to check if a document is soft deleted
  isDeleted(): boolean {
    return !!this.deletedAt;
  }

  // Helper method to perform soft delete
  softDelete(): void {
    this.deletedAt = new Date();
  }

  // Helper method to perform restore from soft delete
  restore(): void {
    this.deletedAt = undefined;
  }
}
