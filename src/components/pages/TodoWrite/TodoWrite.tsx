import React, { useRef, useEffect } from 'react';
import { AppBar, Divider, FormCreator,  } from 'react-carrot-ui';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory, useParams } from 'react-router-dom';

import { TUser } from '../../../types';
import TodoTemplate from '../../templates/TodoTemplate';
import { CREATE_TODO } from '../../../graphql/todo/mutation';
import { CLIENT_USER } from '../../../graphql/authencation/query';

// ===== type

// ===== component
function TodoWrite() {
  const history = useHistory();
  const params = useParams<{category_id: string}>();
  const { data: userData } = useQuery<{ user: TUser }>(CLIENT_USER);
  const [ createTodo ] = useMutation(CREATE_TODO, {
    onCompleted: (res) => { 
      // console.log('> onCompleted: ', res);
      history.push(`/todos/${params.category_id}`);
    },
    onError: () => {
      alert('등록에 실패하였습니다.');
    }
  });
  const formRef = useRef<HTMLFormElement>(null); // 폼 엘리먼트
  const model = [ // 폼 모델 정의
    { 
      label: '할일',
      components: [{
        component: 'TextField',
        props: {
          name: 'input',
          type: 'text',
          value: '',
          mainColor: 'black',
          autoHeight: true,
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
  ];

  // console.log(data);

  // # 체인지 이벤트
  const handleChanges = {
    input: () => {
      console.log('> input')
    }
  };

  // # handle submit
  const handleSubmit = ({ input }: any) => {
    createTodo({
      variables: {
        todo: input,
        categoryId: Number(params.category_id),
        userId: userData?.user.id
      }
    })
  };

  // # header submit 버튼을 눌렀을 때 form trigger
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

export default TodoWrite;