import { Name } from '@app/entities/name.interface';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserNameInput implements Name {
  @Field({ description: 'First name input' })
  firstname: string;

  @Field({ description: 'Middle name input. (optional)', nullable: true })
  middlename?: string;

  @Field({ description: 'Last name input' })
  lastname: string;
}
