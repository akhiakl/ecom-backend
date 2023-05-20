import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IPaginatedType<T> {
  items: T[];
  total: number;
  hasNextPage: boolean;
}

export function PaginatedResponse<T>(
  classRef: Type<T>,
): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef])
    items: T[];

    @Field(() => Int, {
      description: `Total number of ${classRef.name}s.`,
    })
    total: number;

    @Field(() => Boolean, {
      description: 'Indicates whether there is another page of results.',
    })
    hasNextPage: boolean;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
