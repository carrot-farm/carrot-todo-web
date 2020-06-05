import React, { useRef, useEffect } from 'react';
import { AppBar, Divider, FormCreator } from 'react-carrot-ui';

import TodoTemplate from '../../templates/TodoTemplate';

// ===== type
type TCategoryWriteProps = {
  /** 보여질 폼요소 */
};

// ===== component
function CategoryWrite() {
  const formRef = useRef<HTMLFormElement>(null);
  const model = [
    { 
      label: '카테고리',
      components: [{
        component: 'Input',
        props: {
          name: 'input',
          type: 'text',
          value: '',
          color: 'black'
        }
      }]
    }, {
      style:'display: none',
      components: [{
        component: 'Button',
        props: {
          type: 'submit',
          name: 'submitButton',
        }
      }]
    }
  ]

  // # 체인지 이벤트
  const handleChanges = {
    input: () => {
      console.log('> input')
    }
  };

  // # handle submit
  const handleSubmit = (values: any) => {
    console.log('> submit: ', values);
  };

  // # header submit 버튼을 눌렀을 때
  const handleSubmitButtonClick = () => {
    if(formRef && formRef.current) {
      const buttonEl: HTMLButtonElement | null = formRef.current.querySelector(`[name=submitButton]`);
      if(buttonEl && buttonEl.click ) {
        buttonEl.click()
      }
    }
  };

  return (
    <TodoTemplate
      menuButton={false}
      backButton={true}
      writeLinkButton={false}
      submitButton={true}
      onSubmitButtonClick={handleSubmitButtonClick}
    >
      <FormCreator 
        align="vertical"
        reset={true}
        model={model} 
        onChanges={handleChanges} 
        onSubmit={handleSubmit}
        formRef={formRef}
      />
    </TodoTemplate>
  );
}

export default CategoryWrite;