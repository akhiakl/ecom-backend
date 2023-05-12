import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@Entity()
@ObjectType()
export class Cart {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  productId: string;

  @Column({ default: 1 })
  @Field(() => Number)
  quantity: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true, type: 'json' })
  @Field(() => JSON, { nullable: true })
  extra: Record<string, any>;
}
