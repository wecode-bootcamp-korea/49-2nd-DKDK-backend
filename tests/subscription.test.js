const request = require('supertest');
const nock = require('nock');
const { createApp } = require('../app');
//onst { subscriptionPayment } = require('./subscriptionPayment');
//nconst { checksubscriptionValidity } = require('./checksubscriptionValidity');
const { AppDataSource } = require('../src/models/dataSource');

describe('subscriptionPayment', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should handle a valid subscription payment', async () => {
    // 모의 API 요청 및 응답 설정
    nock('https://api.iamport.kr')
      .post('/users/getToken')
      .reply(200, { response: { access_token: 'mocked_access_token' } });

    nock('https://api.iamport.kr')
      .get(/\/payments\/.+/)
      .reply(200, {
        response: { amount: 10000, name: 'DKDK 커뮤니티 1개월 구독권(회원)' },
      });

    // checksubscriptionValidity 모의 함수 설정 (필요한 경우)
    //checksubscriptionValidity.mockResolvedValue(true);

    // 실제 테스트 요청
    const response = await request(app)
      .post('/subscription')
      .send({ imp_uid: 'mocked_imp_uid' })
      .expect(200);

    expect(response.body.message).toBe('PAYMENT_SUCCESS');
  });

  // 다른 테스트 케이스 추가
});