import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Product } from './product.entity';

@Entity()
@ObjectType()
export class Price {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Field(() => Number)
  amount: number;

  @Column()
  @Field()
  currency: string;

  @ManyToOne(() => Product)
  @Field(() => Product)
  @JoinColumn()
  product: Product;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
