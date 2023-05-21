import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '@app/entities/base';

@Entity()
@ObjectType()
export class OrderItem extends BaseEntity {
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
}
