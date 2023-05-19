import { Cart } from '@app/carts/entities';
import { faker } from '@faker-js/faker';
import { RandomCartOptions } from './types';

export const getRandomMockCart = (options?: RandomCartOptions): Cart => {
  const { deletedAtAvailable, ...cart } = options ?? {};
  return {
    id: cart?.id ?? faker.database.mongodbObjectId(),
    name: cart?.name ?? faker.string.alpha(),
    createdAt: cart.createdAt ?? faker.date.anytime(),
    updatedAt: cart.updatedAt ?? faker.date.anytime(),
    ...(deletedAtAvailable && {
      deletedAt: faker.date.anytime(),
    }),
  };
};
