import { ApolloClient } from '../../node_modules/apollo-client';
import { Operation } from '../../node_modules/apollo-link/lib/types';

import { REISSUE_TOKEN } from '../graphql/authencation/query'


// ===== 토큰 저장
export const saveAuthToken = (token: string) => {
  const date = new Date();
  date.setTime(date.getTime())

};

// ===== access token 재발급
type TTokenReissueParam = {
  /** 실패한 리퀘스트 객체 */
  failureOperation: Operation;
  /** apollo client 인스턴스 */
  client: ApolloClient<unknown>;
};
/** access token 재발급 */
export const tokenReissue = async ({
  failureOperation,
  client,
}: TTokenReissueParam) => {
  try {
    // console.log('> call tokenReissue ')
    // # 토큰 재발급 요청
    await client.query({
      query: REISSUE_TOKEN,
    });
    // # 다시 리퀘스트
    await client.query(failureOperation);
    // console.log('> tokenReissue success ')
  } catch(e) {
    throw new Error(e);
  }
};