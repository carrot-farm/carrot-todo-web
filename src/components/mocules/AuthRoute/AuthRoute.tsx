import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';

import { RouteProps } from '../../../../node_modules/@types/react-router';
import { IS_AUTHENCATED } from '../../../graphql/authencation/query';

// ===== type
type TAuthRouteProps = RouteProps & {
  /** 리액트 컴포넌트 */
  component: (props: any) => JSX.Element;
  /** 인증 실패 시 리다이렉트 경로 */
  failuerePath: string;
};

// ===== component
/** 인증유무에 따른 라우트 */
function AuthRout({
  component: Component,
  failuerePath,
  ...args
}: TAuthRouteProps) {
  const [ isAuthencated, { data: authData } ] = useLazyQuery(IS_AUTHENCATED);

  // # 마운트
  useEffect(() => {
    isAuthencated(); // 쿼리 시작
  }, []);

  // # 인증절차를 시작 안했을 경우
  if(authData === undefined) {
    return null
  }

  // # 인증 결과에 따른 리다이렉트와 컴포넌트 레더링
  return (
    <Route {...args} 
      render={(props) => (
        authData.isAuthencated === true
          ? <Component {...props} />
          : <Redirect to={failuerePath} />
      )}
    />
  )
}

export default AuthRout;