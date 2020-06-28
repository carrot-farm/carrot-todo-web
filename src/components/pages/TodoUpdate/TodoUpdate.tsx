import React, { useRef, useState, useEffect } from 'react';
import { FormCreator } from 'react-carrot-ui';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory, useParams } from 'react-router-dom';

import { TUser, TTodo } from '../../../types';
import TodoTemplate from '../../templates/TodoTemplate';
import { CLIENT_USER } from '../../../graphql/authencation/query';
import { TODO } from '../../../graphql/todo/query';
import { UPDATE_TODO } from '../../../graphql/todo/mutation';

// ===== type


// ===== component
function TodoUpdate() {
  const history = useHistory();
  const { id } = useParams<{id: string}>();
  const { data: todoData } = useQuery<{ todo: TTodo }>(TODO, { 
    variables: { id: Number(id) },
  });
  const [ updateTodo ] = useMutation(UPDATE_TODO, {
    onCompleted: () => {
      history.push('/');
    }
  });
  const [ formModel, setFormModel ] = useState<any>(null);
  const formRef = useRef<HTMLFormElement>(null); // 폼 엘리먼트

  // # todo 데이터가 있을 때
  useEffect(() => {
    // # 초기 폼값 셋팅
    if(todoData) {
      setFormModel([
        { 
          label: '할일',
          components: [{
            component: 'TextField',
            props: {
              name: 'input',
              value: todoData.todo.todo,
              mainColor: 'black',
              autoHeight: true
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
      ])
    }
  }, [todoData])

  // # handle submit
  const handleSubmit = ({ input }: any) => {
    updateTodo({
      variables: {
        id: Number(id),
        todo: input
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
      {formModel && 
        <FormCreator 
          align="vertical"
          reset={true}
          model={formModel} 
          onSubmit={handleSubmit}
          formRef={formRef}
        />
      }
    </TodoTemplate>
  );
}

export default TodoUpdate;