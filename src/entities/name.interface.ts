import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class Name {
  @Field({ description: 'First name' })
  firstname: string;

  @Field({ description: 'Middle name', nullable: true })
  middlename?: string;

  @Field({ description: 'Last name' })
  lastname: string;
}