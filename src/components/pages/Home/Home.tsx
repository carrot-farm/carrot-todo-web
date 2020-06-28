/**@jsx jsx */
import { useCallback, useState, useEffect } from 'react';
import { Modal, IconButton } from 'react-carrot-ui';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';

import { TTodos, TTodo,TUser } from '../../../types';
import TodoTemplate from '../../templates/TodoTemplate';
import LoginForm from '../../mocules/LoginForm';
import List from '../../mocules/List';
import ListItem from '../../atoms/ListItem';
import { CLIENT_USER } from '../../../graphql/authencation/query';
import { CLIENT_SELECTED_CATEGORY } from '../../../graphql/category/query';
import { TODOS } from '../../../graphql/todo/query';

// ===== type

// ===== component
function Home() {
  const [ todos, { data: todosData, refetch } ] = useLazyQuery<{todos: TTodos}>(TODOS);
  const { data: selectedCategoryData } = useQuery<{selectedCategory: TCategory}>(CLIENT_SELECTED_CATEGORY);
  const { data: clientUser } = useQuery<{user: TUser}>(CLIENT_USER);
  const [sw, setSw] = useState<boolean>(false);
  const [ isLogin, setIsLogin ] = useState<Boolean>(false); // 로그인 유무
  // console.log('> ', categoryData)

  // # mount
  useEffect(() => {
    if(todosData) {
      refetch();
    }
    console.log('> mount : ', todosData)
  }, [])

  // # clientUser 변화
  useEffect(() => {
    if(clientUser) {
      setIsLogin(!!clientUser.user);
    }
  }, [clientUser]);

  // # selectd category
  useEffect(() => {
    if(clientUser && selectedCategoryData) {
      console.log('> selectedCategoryData: ', clientUser.user.id, selectedCategoryData.selectedCategory.id)
      todos({
        variables: {
          isCompleted: 0,
          userId: clientUser.user.id,
          categoryId: selectedCategoryData.selectedCategory.id
        }
      });
    }
  }, [selectedCategoryData]);

  // # 로그인 버튼 클릭
  const handleLoginButtonClick = useCallback(() => {
    setSw(true);
  }, [sw]);

  // # 로그인 모달 닫기
  const handleClose = useCallback(() => {
    setSw(false);
  }, [sw]);

  // # 로그인 완료
  const handleLoginCompleted = useCallback(() => {
    setSw(false);
    window.location.reload();
    // console.log('> done login')
  }, [sw]);

  // # 할일 삭제
  const handleDeleteTodo = useCallback((id) => {
    // console.log('> handleDeleteTodo: ', id);
  }, [todosData])

  return (
    <div>
      <TodoTemplate
        loginButton={!isLogin}
        writeLinkButton={!!(!!isLogin && selectedCategoryData)}
        headerText={selectedCategoryData ? selectedCategoryData.selectedCategory.category : undefined}
        selectedCategory={selectedCategoryData && selectedCategoryData.selectedCategory}
        onLoginButtonClick={handleLoginButtonClick}
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
      <Modal width="450px" sw={sw} onClose={handleClose}>
        <LoginForm goobleLogin={true} onCompleted={handleLoginCompleted} />
      </Modal>
    </div>
  );
}

// ===== style
const todoLinkStyle = css`
  flex: 1;
`;
const chekcTodoStyle = css`
  z-index: 1;
  margin-right: 0.5rem;
`;
const removeButtonStyle = css`
  z-index: 1;
`;
export default Home;