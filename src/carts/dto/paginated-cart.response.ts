import { PaginatedResponse } from '@app/dto';
import { Cart } from '../schemas';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CartPaginatedResponse extends PaginatedResponse<Cart>(Cart) { }
