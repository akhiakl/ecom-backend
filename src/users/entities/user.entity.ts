import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  password: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true, type: 'json' })
  @Field(() => JSON, { nullable: true })
  extra?: Record<string, any>;
}
