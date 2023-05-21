import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';
import JSON from 'graphql-type-json';
import { ObjectId } from 'mongodb';

@ObjectType()
export abstract class BaseEntity {
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectId;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt?: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt?: Date;

  @DeleteDateColumn({ nullable: true })
  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @Column('json', { nullable: true })
  @Field(() => JSON, { nullable: true })
  extra?: Record<string, any>;
}
