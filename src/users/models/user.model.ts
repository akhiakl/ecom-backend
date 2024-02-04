import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import JSON from 'graphql-type-json';
import { IsEmail } from 'class-validator';
import { UserName } from './user-name.model';

@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn()
  @Field(() => ID, { description: 'Unique identifier' })
  id: string;

  @Column(() => UserName)
  @Field({ description: 'Unique identifier' })
  name: UserName;

  @Column()
  @IsEmail()
  @Field({ description: 'User email address' })
  email: string;

  @Column()
  password: string;

  @Field(() => Date, { description: 'User created time' })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { description: 'User updated time' })
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true, type: 'json' })
  @Field(() => JSON, { nullable: true, description: 'A meta data field containing additional JSON data' })
  extra?: Record<string, any>;
}
