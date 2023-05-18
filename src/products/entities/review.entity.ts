import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '@app/entities/base';

@Entity()
@ObjectType()
export class Review extends BaseEntity {
  @Column()
  @Field()
  text: string;

  @Column()
  @Field()
  rating: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  productId?: string;

  @Column()
  @Field()
  userId: string;
}
