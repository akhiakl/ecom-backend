import { Field, InputType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';
import { UserNameInput } from './user-name.input';
import { IsEmail, IsStrongPassword } from 'class-validator';

@InputType()
export class CreateUserInput {
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
    minSymbols: 1
  })
  password?: string;

  @Field(() => JSON, { nullable: true })
  extra?: Record<string, any>;
}
