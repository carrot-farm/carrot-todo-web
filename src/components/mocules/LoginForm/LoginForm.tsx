/** @jsx jsx */
import React, { useCallback, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import { Button, Base } from 'react-carrot-ui';
import axios from 'axios';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { MY_INFO, CLIENT_USER, GET_TOKEN } from '../../../modules/authencation/authencationQuery';
import { SET_USER } from '../../../modules/authencation/authencationMutation';

// ===== 환경 변수
const {
  API_HOST
} = process.env;

// ===== type
type TLoginForm = {
  /** 구글 로그인 */
  goobleLogin?: boolean;
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
function LoginForm({
  goobleLogin = false,
}) {
  const { data: userData  } = useQuery(CLIENT_USER);
  const [ setUser ] = useMutation(SET_USER); // 로컬 유저 정보 셋팅
  const [ getToken ] = useLazyQuery(GET_TOKEN, { // access/refresh 토큰 발급요청
    onCompleted: (...args) => console.log('> get token success:', args),
    onError: (...args) => console.error('> getToken Error:', args)
  });
  const [ getMyInfo ] = useLazyQuery(MY_INFO, { // 나의 
    onCompleted: (res) => {
      console.log('> getMyInfo:', res)
      if(res.myInfo) {
        // # 로컬에 유저 정보 셋팅
        setUser({
          variables: {
            user: res.myInfo
          }
        })
      }
    },
    onError: err => console.dir(err, {depth: true})
  });
  const [ invalidToken ] = useLazyQuery(gql`
    query {  
      testInvalidToken
    }
  `)
  // const { data, fetchMore } = useQuery(TEST);
  console.log('> myInfo: ', userData)

  // # 로그인 팝업창의 포스트 메시지 통신
  const receiveDisposableToken = ({ data }: { data: TReceiveToken }) => {
    console.log('> login', data);
    if(data && data.token) {
      try{
        getToken({
          context: {
            headers: {
              'Authorization': `Bearer ${data.token}`
            }
          }
        })
      } catch(e) {
        alert('토큰을 가져오는데 실패하였습니다.')
      }
    }
  };
  
  // # 마운트
  useEffect(() => {
    window.addEventListener('message', receiveDisposableToken);
    invalidToken();
    // console.log('> mount', );
    // getMyInfo();
    // # unmount
    return () => {
      window.removeEventListener('message', receiveDisposableToken);
    };
  }, [])

  // # 구글 로그인 활성화
  const handleGoogleLogin = useCallback(() => {
    window.open(
      GOOGLE_LOGIN_URI, 
      'google login', 
      "width=500, height=480"
    )
  }, [goobleLogin])

  return (
    <div className="mocules-loginform-root">
      <Base 
        component="h2" 
        marginBottom={6}
        textAlign="center"
      >로그인</Base>

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

export default LoginForm;