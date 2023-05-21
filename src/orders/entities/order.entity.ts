import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '@app/entities/base';

@Entity()
@ObjectType()
export class Order extends BaseEntity {
  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  status: string;
}
