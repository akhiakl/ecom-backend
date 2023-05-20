import { Args, Int } from '@nestjs/graphql';

type Options = { defaultValue?: number };

export const LimitArg = (options?: Options) =>
  Args('limit', {
    type: () => Int,
    nullable: true,
    defaultValue: options?.defaultValue ?? 10,
    description: 'The maximum number of results to return per page.',
  });

export const PageArg = (options?: Options) =>
  Args('page', {
    type: () => Int,
    nullable: true,
    defaultValue: options?.defaultValue ?? 1,
    description: 'The page number of results to return (starting at 1).',
  });
