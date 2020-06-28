import { gql } from 'apollo-boost';



// ===== 할일 생성
export const CREATE_TODO = gql`
  mutation CreateOneTodo(
    $todo: String!, 
    $categoryId: Int!,
    $userId: Int!
  ){
    createOnetodo(data: {
      todo: $todo,
      is_completed: 0,
      todo_category: {
        connect: {
          id: $categoryId
        }
      },
      user: {
        connect: {
          id: $userId
        }
      }
    }) {
      id
      todo
      is_completed
    }
  }
`;

export const UPDATE_TODO = gql`
mutation UpdateTodo(
  $id: Int! 
  $todo: String!
) {
  updateOnetodo(
    where: {
      id: $id
    }
    data: {
      todo: $todo
    }
  ) {
    id
    todo
    is_completed
  }
}
`

export const DELETE_TODO = gql`
mutation DeleteTodo(
  $id: Int!
) {
  deleteOnetodo(
    where: {
      id: $id
    }
  ) {
    id
    todo
    is_completed
  }
}
`;

export const TOGGLE_TODO = gql`
mutation UpdateTodo(
  $id: Int! 
  $isCompleted: Int!
) {
  updateOnetodo(
    where: {
      id: $id
    }
    data: {
      is_completed: $isCompleted
    }
  ) {
    id
    todo
    is_completed
  }
}
`