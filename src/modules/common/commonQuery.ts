import { gql } from 'apollo-boost';



/** 초기화 데이터 가져오기 */
export const GET_INITIALIZE_DATA = gql`
  query {
    myInfo {
      id
      email
      user_id
    }

    categoriesAll {
      id
      category
    }
  }
`;


// ===== client
// # client store 전체 정보
export const CLIENT_STORE = gql`
query {
  drawerSw @client

  user @client {
    id
    user_id
    email
  }

  categories @client {
    id
    category
  }

}
`

export const CLIENT_COMMON = gql`
  query {
    drawerSw @client
    categories @client {
      id
      category
    }
  }
`;


