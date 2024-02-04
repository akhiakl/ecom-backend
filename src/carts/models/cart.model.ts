import {
  Entity,
  Column,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import JSON from 'graphql-type-json';
import { Total } from './cart-total.model';

@Entity()
@ObjectType()
export class Cart {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  userId?: string;

  @Field()
  total: Total;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true, type: 'json' })
  @Field(() => JSON, { nullable: true })
  extra: Record<string, any>;
}
