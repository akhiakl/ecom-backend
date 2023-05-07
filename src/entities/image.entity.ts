import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@Entity()
@ObjectType()
export class Image {
  @ObjectIdColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  filename: string;

  @Column('json')
  @Field(() => JSON)
  meta: Record<string, any>;

  @Column({ nullable: true, type: 'json' })
  @Field(() => JSON, { nullable: true })
  extra: Record<string, any>;
}
