import { gql } from 'apollo-boost';

// ===== api
export const CATEGORIES_ALL = gql`
query CategoriesAll{
  categoriesAll {
    id
    category
  }
}
`;
export const GET_CATEGORY = gql`
  query GetCategory($id: Int!) {
    todoCategory(
      where: {
        id: $id
      }
    ) {
      id
      category
    }
  }
`;


// ===== client
/** client 카테고리 리스트 */
export const CLIENT_CATEGORIES = gql`
  query {
    categories @client {
      id
      category
    }
  }
`;

/** 지정된 카테고리 가져오기 */
export const CLIENT_CATEGORY = gql`
  query ClientCategory($id: ID!){
    clientCategory(id: $id) @client {
      id
      category
    }
  }
`