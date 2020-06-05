import { gql } from 'apollo-boost';

// ===== Drawer
// # drawer 활성화
export const SET_DRAWER_SW = gql`
  mutation SetDrawerSw($sw: Boolean!) {
    setDrawerSw(sw: $sw) @client
  }
`;