import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export const getRepositoryMock = (Entity: EntityClassOrSchema) => ({
  provide: getRepositoryToken(Entity),
  useClass: Repository,
});
