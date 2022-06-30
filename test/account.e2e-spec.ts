import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import connection from './connection';

describe('AccountResolver (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await connection.clear();
    await app.init();
  });

  afterAll(async () => {
    await connection.close();
    await app.close();
  });

  const gql = '/graphql';

  describe('createAccount', () => {
    it('should create a new account', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `mutation accountCreate {
            accountCreate(
              input: {
                title: "test after helmet update"
                total: 1232
                image: "https://picsum.photos/seed/picsum/200/300",
              }
            ) {
              account {
                id
                title
                total
                image
              }
            }
          }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.accountCreate).toEqual({
            title: 'test after helmet update',
            total: 1232,
            image: 'https://picsum.photos/seed/picsum/200/300',
          });
        });
    });
  });
});
