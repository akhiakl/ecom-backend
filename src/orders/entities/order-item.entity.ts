import {
  Entity,
  Column,
  ObjectIdColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@Entity()
@ObjectType()
export class OrderItem {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @ManyToOne(() => Order)
  @JoinColumn()
  @Field(() => Order)
  order: Order;

  @Column()
  @Field()
  productId: string;

  @Column()
  @Field()
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
