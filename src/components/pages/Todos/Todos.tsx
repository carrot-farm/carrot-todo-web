import React from 'react';
import { AppBar, Divider } from 'react-carrot-ui';

import TodoTemplate from '../../templates/TodoTemplate';

// ===== type
type TTodosProps = {

};


// ===== component
function Todos() {

  return (
    <div>
      <TodoTemplate>
        Todos
      </TodoTemplate>
    </div>
  );
}

export default Todos;