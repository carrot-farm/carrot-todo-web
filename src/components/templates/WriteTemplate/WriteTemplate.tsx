import React from 'react';
// import { AppBar, Divider } from 'react-carrot-ui';

import TodoTemplate from '../../templates/TodoTemplate';

// ===== type
type TWriteTemplateProps = {
  children?: React.ReactNode
};


// ===== component
function WriteTemplate({
  children
}: TWriteTemplateProps) {

  return (
    <div>
      <TodoTemplate
        backButton={true}
        writeLinkButton={false}
        submitButton={true}
      >
        WriteTemplate
      </TodoTemplate>
    </div>
  );
}

export default WriteTemplate;