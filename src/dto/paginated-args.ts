import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginatedArgs {
  @Field(() => Int, {
    nullable: true,
    defaultValue: 1,
    description: 'The page number of results to return (starting at 1).',
  })
  page?: number = 1;

  @Field(() => Int, {
    nullable: true,
    defaultValue: 10,
    description: 'The maximum number of results to return per page.',
  })
  limit?: number = 10;
}
