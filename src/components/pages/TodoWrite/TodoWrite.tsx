import React from 'react';
import { AppBar, Divider } from 'react-carrot-ui';

import TodoTemplate from '../../templates/TodoTemplate';

// ===== type
type TTodoWriteProps = {

};


// ===== component
function TodoWrite() {

  return (
    <div>
      <TodoTemplate 
        backButton={true}
        writeLinkButton={false}
        submitButton={true}
      >
        TodoWrite
      </TodoTemplate>
    </div>
  );
}

export default TodoWrite;