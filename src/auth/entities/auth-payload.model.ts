import { User } from '@app/users/models';
import { ObjectType, Field } from '@nestjs/graphql';
import { TokenPayload } from './token-payload.model';

@ObjectType()
export class AuthPayload extends TokenPayload {
  @Field(() => User)
  user: Omit<User, 'password'>;
}
