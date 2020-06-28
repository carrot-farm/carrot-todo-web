import { gql } from 'apollo-boost';



// ===== 카테고리 가져오기
export const getCategory = gql`
  query GetCategory($id: Int!) {
    todoCategory(
      where:{  
        id: $id
      }
    ) {
      id
      category
    }
  }
`;

// ===== 카테고리 생성
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: String!){
    createOnetodo_category(data: {
      category: $input
    }) {
      id
      category
    }
  }
`;

// ===== 카테고리 업데이트
export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($input: String!, $id: Int!) {
    updateOnetodo_category(
      where:{
        id: $id
      },
      data: {
        category: $input
      }
    ) {
      id
      category
    }

    updateCategory(
      id: $id,
      category: $input,
    ) @client {
      id
      category
    }
  }
`;


// ===== 카테고리 삭제
export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id){
      id
      category
    }
  }
`;


// ===== client
// # 카테고리 삭제
export const CLIENT_DELETE_CATEGORY = gql`
  mutation ClientDeleteCategory($id: ID!) {
    deleteCategory(id: $id) @client {
      id
      category
    }
  }
`;

// # 카테고리 업데이트
export const CLIENT_UPDATE_CATEGORY = gql`
  mutation ClientUpdateCategory($id: ID!, $category: String!) {
    updateCategory(
      id: $id,
      category: $category
    ) @client {
      id
      category
    }
  }
`;
// # 카테고리 선택
export const CLIENT_SELECT_CATEGORY = gql`
mutation ClientSelectCategory($categoryId: Int!) {
  clientSelectCategory(categoryId: $categoryId) @client {
    id
    category
  }
}
`
