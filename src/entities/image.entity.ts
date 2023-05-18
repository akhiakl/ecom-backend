import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import JSON from 'graphql-type-json';
import { BaseEntity } from './base';

@Entity()
@ObjectType()
export class Image extends BaseEntity {
  @Column()
  @Field()
  filename: string;

  @Column('json')
  @Field(() => JSON)
  meta: Record<string, any>;
}
