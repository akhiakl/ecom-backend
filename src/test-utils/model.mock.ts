import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export const getModelMock = (name: string) => ({
  provide: getModelToken(name),
  useFactory: (): Model<any> => {
    return new Model({}, name);
  },
});
