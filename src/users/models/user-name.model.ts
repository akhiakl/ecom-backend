import { Name } from '@app/entities/name.interface';
import { ObjectType } from '@nestjs/graphql';

@ObjectType({
  implements: () => [Name],
})
export class UserName implements Name {
  firstname: string;
  middlename?: string;
  lastname: string;
}
