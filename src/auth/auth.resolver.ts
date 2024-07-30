import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { AuthPayload } from './entities/auth-payload.model';
import { TokenInput } from './dto/token.input';
import { TokenPayload } from './entities/token-payload.model';
import { RegisterInput } from './dto/register.input';

@Resolver(() => AuthPayload)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  signIn(@Args('input') loginInput: LoginInput) {
    return this.authService.signIn(loginInput);
  }

  @Mutation(() => AuthPayload)
  register(@Args('input') input: RegisterInput) {
    return this.authService.register(input);
  }

  @Mutation(() => TokenPayload)
  refreshToken(@Args('input') tokenInput: TokenInput) {
    return this.authService.refreshToken(tokenInput.refreshToken);
  }

  @Mutation(() => Boolean)
  revokeToken(@Args('input') tokenInput: TokenInput) {
    return this.authService.revokeToken(tokenInput.refreshToken);
  }
}
