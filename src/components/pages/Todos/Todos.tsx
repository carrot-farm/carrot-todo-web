/**@jsx jsx */
import { useCallback, useState, useEffect } from 'react';
import { Modal, IconButton } from 'react-carrot-ui';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { jsx, css } from '@emotion/core';
import { Link, useParams } from 'react-router-dom';

import { TTodos, TTodo,TUser, TClientStore } from '../../../types';
import TodoTemplate from '../../templates/TodoTemplate';
import LoginForm from '../../mocules/LoginForm';
import List from '../../mocules/List';
import ListItem from '../../atoms/ListItem';
import { CLIENT_USER } from '../../../modules/authencation/authencationQuery';
import { CLIENT_SELECTED_CATEGORY } from '../../../modules/category/categoryQuery';
import { TODOS } from '../../../modules/todo/todoQuery';
import { DELETE_TODO, TOGGLE_TODO } from '../../../modules/todo/todoMutation';
import { CLIENT_STORE } from '../../../modules/common/commonQuery';
import { TUserState } from '../../../types/authencate';

// ===== type
type TClientCategoryData = {
  selectedCategory: TCategory
};
type TClientUserData = {
  user: TUser
}
type TUseTodos =  {
  todos: TTodos
}
type TUseClientStore = {
  
}

// ===== component
function Todos() {
  const { category_id } = useParams<{category_id: string}>();
  const { data: clientStoreData } = useQuery<TClientStore>(CLIENT_STORE);
  // const { data: todosData, refetch } = useQuery<TUseTodos>(TODOS, {
  //   variables: {
  //     isCompleted: 0,
  //     categoryId: Number(category_id),
  //     userId: userData ? userData.user_id!.id : 0
  //   }
  // });
  const [ todos, { data: todosData, refetch }] = useLazyQuery<TUseTodos>(TODOS);
  const [ deleteTodo ] = useMutation(DELETE_TODO, {
    onCompleted: () => {
      refetch()
    }
  });
  const [ toggleTodo ] = useMutation(TOGGLE_TODO, {
    onCompleted: () => refetch()
  })
  const [ category, setCategory ] = useState<TCategory | undefined>(undefined);
  // console.log('> ', category_id, todosData)

  // # 현재 카테고리 선택
  useEffect(() => {
    const { user, categories } = clientStoreData || {};
    if(user && categories) {
      // console.log('> clientCategoryData: ', user, categories)
      const findedCategory = categories.find((a: TCategory) => a.id === Number(category_id));
      setCategory(findedCategory);
      todos({
        variables: {
          userId: user.id,
          isCompleted: 0,
          categoryId: Number(category_id)
        }
      });
    }
  }, [category_id]);

  // # 완료 미완료 토글
  const handleToggleTodo = useCallback((id:number, isCompleted:number) => {
    // console.log('> toggle : ', id, isCompleted === 0 ? 1 : 0)
    toggleTodo({
      variables: {
        id,
        isCompleted: isCompleted === 0 ? 1 : 0
      }
    });
  }, []);

  // # 할일 삭제
  const handleDeleteTodo = useCallback((id) => {
    // console.log('> handleDeleteTodo: ', id)
    if(!confirm('정말 삭제하시겠습니까?')) {
      return;
    }
    deleteTodo({
      variables: {
        id
      }
    })
  }, [todosData]);

  // # 랜더링
  return (
    <div>
      <TodoTemplate
        writeLinkButton={true}
        headerText={category ? category.category : undefined}
        selectedCategory={category}
      >
        {/* ===== 할일 리스트 ===== */}
        {todosData && 
          <List>
            {todosData.todos.map((a: TTodo) => 
              <ListItem flexAlign={'middle'} ripple={false } key={a.id}>
                {/* todo의 왼쪽 */}
                <div css={chekcTodoStyle}>
                  <IconButton 
                    backgroundColor="transparent"
                    rippleColor="grey"
                    iconName={a.is_completed ? 'radioboxChecked' : 'radioboxBlank'}
                    onClick={() => handleToggleTodo(a.id, a.is_completed)}
                  />
                </div>

                {/* 할일 목록 */}
                <div css={todoLinkStyle}>
                  <Link to={`/todo/update/${a.id}`} style={{display: 'block', width: '100%'}}>
                    {a.todo}
                  </Link>
                </div>

                {/* todo 의 오른쪽 */}
                <div css={removeButtonStyle} title="할일 삭제">
                  <IconButton 
                    backgroundColor="transparent"
                    rippleColor="grey"
                    iconName={'close'}
                    onClick={() => handleDeleteTodo(a.id)}
                  />
                </div>
              </ListItem>
            )}
          </List>
        }
      </TodoTemplate>
    </div>
  );
}

// ===== style
const todoLinkStyle = css`
  flex: 1;
  height: 2rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: unset;
  width: 100%;
`;
const chekcTodoStyle = css`
  z-index: 1;
  margin-right: 0.5rem;
`;
const removeButtonStyle = css`
  z-index: 1;
`;
export default Todos;