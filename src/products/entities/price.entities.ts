import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from './product.entity';
import { BaseEntity } from '@app/entities/base';

@Entity()
@ObjectType()
export class Price extends BaseEntity {
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
}
