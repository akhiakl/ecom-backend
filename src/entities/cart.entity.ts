import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Product } from './product.entity';
import { User } from './user.entity';
import JSON from 'graphql-type-json';

@Entity()
@ObjectType()
export class Cart {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  @Field(() => User)
  user: User;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn()
  @Field(() => Product)
  product: Product;

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
