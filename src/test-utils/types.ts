import { Cart } from '@app/carts/entities';
import { ObjectId } from 'mongodb';

export type RandomCartOptions = Partial<Omit<Cart, 'deletedAt'>> & {
  name?: string;
  id?: ObjectId;
  deletedAtAvailable?: boolean;
};
