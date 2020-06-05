import ApolloClient, { gql } from 'apollo-boost';

import commonState from './common/commonState';
import commonResolver from './common/commonResolver';

import authencationState from './authencation/authencationState';
import authencationResolver from './authencation/authencationResolver';

import { tokenReissue } from '../utils/authUtils';

// ===== 변수
const {
  API_HOST
} = process.env;

// ===== 리졸버 정의
const resolvers = {
  Mutation: {
    ...commonResolver,
    ...authencationResolver
  }
};

// ===== 기본 state 정의
const defaults = {
  ...commonState,
  ...authencationState
};

// ===== apollo client
const client = new ApolloClient({
  uri: API_HOST,
  clientState: {
    defaults,
    resolvers,
  },
  request: async operation => {
    operation.setContext({
      fetchOptions: {
        credentials: 'include'
      }
    });
  },
  onError: (err) => {
    const errors = err.graphQLErrors;
    try {
      // console.log('> onError: ', err);
      
      // # graphql 에러 처리
      if(errors && errors.length) {
        // # access token 인증 만료시 재발급 요청
        if(errors[0].message === 'Not authorized') {
          if(i === 0) {
            i++;
            tokenReissue({
              client: client,
              failureOperation: err.operation,
            });
            // # 중복으로 재발급 요청을 막기위해
            setTimeout(() => {
              i = 0;
            }, 20000)
          }
        } else {
          console.error(errors);
        }
        
      }
    } catch(e) {
      console.error(e);
    }
  }
});

let i = 0;

export default client;