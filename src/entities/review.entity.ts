import {
  Entity,
  Column,
  ObjectIdColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@Entity()
@ObjectType()
export class Review {
  @ObjectIdColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  text: string;

  @Column()
  @Field()
  rating: number;

  @ManyToOne(() => Product)
  @Field(() => Product)
  product: Product;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

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
