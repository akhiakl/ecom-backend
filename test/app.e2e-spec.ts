import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('hello query', () => {
    it('should return hello in response', () => {
      const query = `#graphql
    query {
      hello {
        id
        name
      }
    }
  `;
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query,
        })
        .expect((res) => {
          expect(res.body.data.hello).toBeDefined();
        });
    });
  });
});
