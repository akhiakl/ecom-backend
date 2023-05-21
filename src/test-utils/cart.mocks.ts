import { faker } from '@faker-js/faker';
import { RandomCartOptions } from './types';

interface ICart {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  items: any[]; // Define a suitable type for the items property
}

export const getRandomMockCart = (options?: RandomCartOptions): ICart => {
  const { deletedAtAvailable, ...cart } = options ?? {};
  return {
    id: cart?.id ?? faker.database.mongodbObjectId(),
    name: cart?.name ?? faker.string.alpha(),
    createdAt: cart.createdAt ?? faker.date.anytime(),
    updatedAt: cart.updatedAt ?? faker.date.anytime(),
    ...(deletedAtAvailable && {
      deletedAt: faker.date.anytime(),
    }),
    items: [],
  };
};
