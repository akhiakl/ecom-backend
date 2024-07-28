import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto';
import { User } from './models';
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, {
    name: 'user',
    description: 'Find a user by ID.',
  })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, {
    description: 'Update an existing user.',
  })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User, {
    description: 'Remove a user by ID.',
  })
  removeUser(@Args('id', { type: () => Int }) id: string) {
    return this.usersService.delete(id);
  }
}
