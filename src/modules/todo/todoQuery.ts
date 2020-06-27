import { gql } from 'apollo-boost';

// ===== api
export const TODOS = gql`
query Todos(
  $isCompleted: Int!
  $categoryId: Int!
  $userId: Int!
){
  todos(
    where: {
      is_completed: {
        equals: $isCompleted
      },
      user_pk: {
        equals: $userId
      },
      todo_category_pk: {
        equals: $categoryId
      }
    }
    orderBy: {
      id: desc
    }
  ) {
    id
    todo
    is_completed
    
  }
}
`;

export const TODO = gql`
query Todo($id: Int!) {
  todo(
    where: {
      id: $id,
    }
  ) {
    id
    todo
    is_completed
  }
}
`;

// ===== client
