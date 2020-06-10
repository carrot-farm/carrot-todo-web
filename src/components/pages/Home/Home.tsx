import React, { useCallback, useState, useEffect } from 'react';
import { AppBar, Divider, Modal } from 'react-carrot-ui';

import { useQuery } from '@apollo/react-hooks';
import TodoTemplate from '../../templates/TodoTemplate';
import LoginForm from '../../mocules/LoginForm';
import { CLIENT_USER } from '../../../modules/authencation/authencationQuery';
import { CATEGORIES_ALL } from '../../../modules/category/categoryQuery';

// ===== type
type THomeProps = {
};


// ===== component
function Home() {
  const { data: categoryData } = useQuery<{categoriesAll: TCategories}>(CATEGORIES_ALL);
  const { data: clientUser } = useQuery(CLIENT_USER);
  const [sw, setSw] = useState<boolean>(false);
  const [ isLogin, setIsLogin ] = useState<Boolean>(false); // 로그인 유무
  console.log('> ', categoryData)

  // # clientUser 변화
  useEffect(() => {
    setIsLogin(!!clientUser.user);
  }, [clientUser]);

  // # 로그인 버튼 클릭
  const handleLoginButtonClick = useCallback(() => {
    setSw(true);
  }, [sw]);

  // # 로그인 모달 닫기
  const handleClose = useCallback(() => {
    setSw(false);
  }, [sw])

  return (
    <div>
      <TodoTemplate
        loginButton={!isLogin}
        onLoginButtonClick={handleLoginButtonClick}
      >
        Todo
      </TodoTemplate>
      <Modal width="450px" sw={sw} onClose={handleClose}>
        <LoginForm goobleLogin={true} />
      </Modal>
    </div>
  );
}

export default Home;