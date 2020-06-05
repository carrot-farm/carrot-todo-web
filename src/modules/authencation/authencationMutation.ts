import { gql } from 'apollo-boost';

// ===== Drawer
// # drawer 활성화
export const SET_USER = gql`
  mutation SetUser($user: Object!) {
    setUser(user: $user) @client {
      id
      user_id
      email
    }
  }
`;