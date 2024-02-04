import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Total {
  @Field({
    description: 'The amount, before taxes and discounts, for the customer to pay',
    defaultValue: 0
  })
  total: number;

  @Field({
    description: 'The total amount for the customer to pay',
    defaultValue: 0
  })
  subtotal: number;

  @Field({
    description: 'The tax amount for the customer to pay at checkout',
    defaultValue: 0
  })
  totalTax: number;
}
