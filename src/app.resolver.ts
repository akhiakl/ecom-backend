import { Query, Resolver } from '@nestjs/graphql';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Hello {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;
}

@Resolver((of) => Hello)
export class AppResolver {
  constructor() { }

  @Query((returns) => Hello)
  hello(): Hello {
    return {
      id: 312312,
      name: 'world',
    };
  }
}
