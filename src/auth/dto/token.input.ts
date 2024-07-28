import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TokenInput {
  @Field()
  refreshToken: string;
}
