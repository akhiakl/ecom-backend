import { Entity, Column, ManyToOne, ObjectIdColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity } from '@app/entities/base';
import { Cart } from '@app/carts/entities';
import { ObjectId } from 'mongodb';

@Entity()
@ObjectType()
export class CartItem extends BaseEntity {
  @Column()
  @Field()
  itemId: string;

  @Column()
  @Field(() => Int)
  quantity: number;

  @ObjectIdColumn()
  cartId: ObjectId;
}
