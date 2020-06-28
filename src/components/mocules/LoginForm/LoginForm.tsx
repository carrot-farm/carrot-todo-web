/** @jsx jsx */
import React, { useCallback, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import { Button, Base, Divider } from 'react-carrot-ui';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';

import { MY_INFO, GET_TOKEN } from '../../../graphql/authencation/query';
import { SET_USER } from '../../../graphql/authencation/mutation';

// ===== 환경 변수
const {
  API_HOST
} = process.env;

// ===== type
type TLoginForm = {
  /** 구글 로그인 */
  goobleLogin?: boolean;
  /** 로그인 완료 이벤트 콜백 */
  onCompleted?: () => any;
};

// # 토큰 정보
type TReceiveToken = {
  /** 에러 유무 */
  error: boolean;
  /** 토큰 정보 */
  token: string;
  /** 토큰 타입 */
  type: string;
};

// ===== component
/** 로그인 폼 컴포넌트 */
function LoginForm({
  goobleLogin = false,
  onCompleted
}: TLoginForm) {
  // 로컬 유저 정보 셋팅
  const [ setUser ] = useMutation(SET_USER, { 
    onCompleted, 
  }); 
  // access/refresh 토큰 발급요청
  const [ getToken ] = useLazyQuery(GET_TOKEN, { 
    onCompleted: (res) => {
      if(res.getTokens) {
        console.log('> getToken completed:', res)
        getMyInfo();
      }
    },
    onError: (...args) => console.error('> getToken Error:', args)
  });
  // 나의 정보 가져온 뒤 셋팅
  const [ getMyInfo ] = useLazyQuery(MY_INFO, { 
    onCompleted: (res) => {
      console.log('> getMyInfo completed:', res)
      if(res.myInfo) {
        // # 로컬에 유저 정보 셋팅
        setUser({
          variables: {
            user: res.myInfo
          }
        });
      }
    },
    onError: err => console.error(err)
  });
  
  // # 마운트
  useEffect(() => {
    window.addEventListener('message', receiveDisposableToken);
    // getMyInfo();
    // # unmount
    return () => {
      window.removeEventListener('message', receiveDisposableToken);
    };
  }, []);


  // # 로그인 팝업창의 포스트 메시지 통신
  const receiveDisposableToken = ({ data }: { data: TReceiveToken }) => {
    if(data && data.token) {
      try{
        getToken({
          context: {
            headers: {
              'Authorization': `Bearer ${data.token}`
            }
          }
        });
      } catch(e) {
        alert('토큰을 가져오는데 실패하였습니다.')
      }
    }
  };

  // # 구글 로그인 활성화
  const handleGoogleLogin = useCallback(() => {
    window.open(
      GOOGLE_LOGIN_URI, 
      'google login', 
      "width=500, height=480"
    )
  }, [goobleLogin])

  // # 랜더링
  return (
    <div className="mocules-loginform-root" css={rootStyle}>
      <Base 
        component="h2" 
        marginBottom={6}
        textAlign="center"
      >로그인</Base>

      <Base marginBottom={6}>
        <Divider color="grey-lighten-1" />
      </Base>

      {goobleLogin && 
        <div>
          <Button 
            fullWidth 
            backgroundColor="red" 
            hoverColor="red-darken-2"
            rippleColor="red-lighten-3"
            onClick={handleGoogleLogin}
          >
            GOOGLE
          </Button>
        </div>
      }
    </div>
  )
}

// ===== 변수
const { GOOGLE_LOGIN_URI } = process.env;

// ===== 스타일
const rootStyle = css`
  // overflow: hidden;
`

export default LoginForm;