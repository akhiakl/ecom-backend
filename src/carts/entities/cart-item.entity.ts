import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '@app/entities/base';

@Entity()
@ObjectType()
export class CartItem extends BaseEntity {
  @Column()
  @Field()
  productId: string;

  @Column()
  @Field()
  quantity: number;
}
