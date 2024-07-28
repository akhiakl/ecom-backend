import { UserNameInput } from '@app/users/dto';
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsStrongPassword } from 'class-validator';
import JSON from 'graphql-type-json';

@InputType()
export class RegisterInput {
  @Field()
  name: UserNameInput;

  @IsEmail()
  @Field()
  email: string;

  @Field()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  password?: string;

  @Field(() => JSON, { nullable: true })
  extra?: Record<string, any>;
}
