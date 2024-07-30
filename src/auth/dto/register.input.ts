import { CreateUserInput } from '@app/users/dto';
import { InputType } from '@nestjs/graphql';

@InputType()
export class RegisterInput extends CreateUserInput {}
