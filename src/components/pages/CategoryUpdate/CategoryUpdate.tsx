import React, { useRef, useEffect } from 'react';
import { FormCreator } from 'react-carrot-ui';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import TodoTemplate from '../../templates/TodoTemplate';
import { RouteComponentProps } from '../../../../node_modules/@types/react-router-dom';
import { GET_CATEGORY } from '../../../graphql/category/query';
import { UPDATE_CATEGORY } from '../../../graphql/category/mutation';

// # match.parms 정의
type TMatchParams = {
  id: string;
}

// ===== component
function CategoryUpdate({ match, history }: RouteComponentProps<TMatchParams>)  {
  const categoryId = Number(match.params.id);
  const [ updateCategory ] = useMutation(UPDATE_CATEGORY, {
    onCompleted: () => {
      history.push('/')
    },
  });
  const [clientCategory, { data }] = useLazyQuery(GET_CATEGORY, {
    variables: {
      id: categoryId
    }
  });
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
          value: ''
        }
      }]
    }
  ];

  // # mount
  useEffect(() => {
    clientCategory()
  }, []);
  

  // # 체인지 이벤트
  const handleChanges = {
    input: () => {
      // console.log('> input', model)
    }
  };

  // # handle submit
  const handleSubmit = ({ input }: any) => {
    // console.log('> submit: ', input, categoryId);
    updateCategory({
      variables: {
        input,
        id: categoryId
      },
    });
    
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
      {data && (
        model[0].components[0].props.value = data.todoCategory.category,
        <FormCreator 
          align="vertical"
          reset={false}
          model={model} 
          onChanges={handleChanges} 
          onSubmit={handleSubmit}
          formRef={formRef}
        />
      )}
    </TodoTemplate>
  );
}

export default CategoryUpdate;