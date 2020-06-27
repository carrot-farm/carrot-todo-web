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
/** 선택된 카테고리 */
export const CLIENT_SELECTED_CATEGORY = gql`
query {
  selectedCategory @client {
    id
    category
  }
}
`;