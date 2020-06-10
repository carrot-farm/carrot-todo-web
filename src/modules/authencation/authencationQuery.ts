import { gql } from 'apollo-boost';

/** 서버에서 나의 회원 정보 받아 오기 */
export const MY_INFO = gql`
query {
  myInfo {
    id
    email
    user_id
  }
}
`;

/** accessToken/refresh 발급 요청 */
export const GET_TOKEN = gql`
query {
  getTokens
}
`;

/** accessToken 재발급 요청 */
export const REISSUE_TOKEN = gql`
query {
  reissueToken
}
`;

/** 클라이언트에서 유저 정보 가져오기 */
export const CLIENT_USER = gql`
{
  user @client {
    id 
    email
    user_id 
  }
}
`;

/** 현재 인증되어 있는지 확인 */
export const IS_AUTHENCATED = gql`
  {
    isAuthencated
  }
`
