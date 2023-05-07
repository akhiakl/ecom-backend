import { Test, TestingModule } from '@nestjs/testing';
import { AppResolver, Hello } from './app.resolver';

describe('AppResolver', () => {
  let appResolver: AppResolver;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [AppResolver],
    }).compile();

    appResolver = moduleRef.get<AppResolver>(AppResolver);
  });

  describe('hello', () => {
    it('should return a Hello object with id and name properties', () => {
      const result: Hello = appResolver.hello();
      expect(result).toMatchObject({ id: expect.any(Number), name: 'world' });
    });
  });
});
