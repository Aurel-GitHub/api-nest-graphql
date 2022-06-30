import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import connection from './connection';
import { getApplication } from './util/get-application';

describe('AccountResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApplication();
  });

  afterAll(async () => {
    await connection.close();
    await app.close();
  });

  const gql = '/graphql';

  describe('createAccount', () => {
    it('should create a new account', async () => {
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
          console.log('res', res.body);
          expect(res.body.data).toMatchObject({
            title: 'test after helmet update',
            total: 1232,
            image: 'https://picsum.photos/seed/picsum/200/300',
          });
        });
    });
  });
});
