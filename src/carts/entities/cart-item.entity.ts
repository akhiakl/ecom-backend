import {
  Entity,
  Column,
  ObjectIdColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@Entity()
@ObjectType()
export class CartItem {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @ManyToOne(() => Cart)
  @JoinColumn()
  @Field(() => Cart)
  order: Cart;

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
