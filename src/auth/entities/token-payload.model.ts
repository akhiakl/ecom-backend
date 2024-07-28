import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TokenPayload {
  @Field()
  accessToken: string;

  @Field({ description: 'Access token expiry time in seconds' })
  expiresIn: number;

  @Field()
  refreshToken: string;

  @Field({ description: 'Refresh token expiry time in seconds' })
  refreshTokenExpiresIn: number;

  @Field()
  tokenType: string;
}
