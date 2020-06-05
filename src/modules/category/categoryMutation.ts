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
      category_name
    }
  }
`;

// ===== 카테고리 생성
export const createCategory = gql`
  mutation CreateCategory($input: String!){
    createOnetodo_category(data: {
      category_name: $input
    }) {
      id
      category_name
    }
  }
`;

// ===== 카테고리 업데이트
export const updateCategory = gql`
  mutation UpdateCategory($input: String!, $id: Int!) {
    updateOnetodo_category(
      where:{
        id: $id
      },
      data: {
        category_name: $input
      }
    ) {
      id
      category_name
    }
  }
`;

// ===== 카테고리 삭제
export const deleteCategory = gql`
  mutation DeleteCategory($id: Int!) {
    deleteOnetodo_category(
      where: {id: $id}
    ) {
      id
      category_name
    }
  }
`;
