import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '@app/entities/base';
import { CartItem } from './cart-item.entity';

@Entity()
@ObjectType()
export class Cart extends BaseEntity {
  @Column({ nullable: true })
  @Field({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  userId?: string;

  @Field(() => [CartItem], { nullable: true })
  items?: CartItem[];
}
