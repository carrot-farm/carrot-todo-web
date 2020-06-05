import React, { useCallback, useState } from 'react';
import { AppBar, Divider, Modal } from 'react-carrot-ui';

import TodoTemplate from '../../templates/TodoTemplate';
import LoginForm from '../../mocules/LoginForm';

// ===== type
type THomeProps = {

};

// ===== component
function Home() {
  const [sw, setSw] = useState<boolean>(false);
  // console.log('> ', process.env.API_HOST)

  const handleLoginButtonClick = useCallback(() => {
    console.log('> open', sw);
    setSw(true);
  }, [sw]);

  const handleClose = useCallback(() => {
    console.log('> close');
    setSw(false);
  }, [sw])

  return (
    <div>
      <TodoTemplate
        loginButton={true}
        onLoginButtonClick={handleLoginButtonClick}
      >
        Todo
      </TodoTemplate>
      <Modal width="450px" sw={true} onClose={handleClose}>
        <LoginForm goobleLogin={true} />
      </Modal>
    </div>
  );
}

export default Home;