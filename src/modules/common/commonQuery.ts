import { gql } from 'apollo-boost';

export const COMMON = gql`
  query {
    drawerSw @client
  }
`