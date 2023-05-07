import {
  Entity,
  Column,
  ObjectIdColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@Entity()
@ObjectType()
export class Order {
  @ObjectIdColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @Column()
  @Field()
  status: string;

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
