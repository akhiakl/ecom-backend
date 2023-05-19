import { Cart } from '@app/carts/entities';

export type RandomCartOptions = Partial<Omit<Cart, 'deletedAt'>> & {
  name?: string;
  id?: string;
  deletedAtAvailable?: boolean;
};
