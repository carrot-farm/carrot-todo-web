import { gql } from 'apollo-boost';

export const CLIENT_COMMON = gql`
  query {
    drawerSw @client
    categories @client {
      id
      category
    }
  }
`

/** 초기화 */
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