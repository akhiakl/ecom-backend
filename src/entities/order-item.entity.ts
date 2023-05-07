import {
  Entity,
  Column,
  ObjectIdColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@Entity()
@ObjectType()
export class OrderItem {
  @ObjectIdColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => Order)
  @Field(() => Order)
  order: Order;

  @ManyToOne(() => Product)
  @Field(() => Product)
  product: Product;

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
