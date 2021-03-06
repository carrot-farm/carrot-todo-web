import ApolloClient from 'apollo-boost';

import commonState from './common/state';
import commonResolver from './common/mutationResolver';

import authencationState from './authencation/state';
import authencationMutationResolver from './authencation/mutationResolver';

import categoryMutationResolver from './category/mutationResolver';

// import { tokenReissue } from '../utils/authUtils';

// ===== 변수
const {
  API_HOST
} = process.env;

// ===== 리졸버 정의
const resolvers = {
  Query: {
    // ...queryResolver,
  },
  Mutation: {
    ...commonResolver,
    ...authencationMutationResolver,
    ...categoryMutationResolver
  }
};

// ===== 기본 state 정의
const defaults = {
  ...commonState,
  ...authencationState
};

// ===== apollo client
const client = new ApolloClient({
  // # uri 셋팅
  uri: API_HOST,
  // # state 셋팅
  clientState: {
    defaults,
    resolvers,
  },
  // # 오퍼레이션 인터셉터.
  request: async operation => {
    operation.setContext({
      fetchOptions: {
        credentials: 'include'
      }
    });
  },
  // onError: (err) => {
  //   const errors = err.graphQLErrors;
  //   try {
  //     // console.log('> onError: ', err);
      
  //     // # graphql 에러 처리
  //     if(errors && errors.length) {
  //       console.log(errors[0]);
  //       // # access token 인증 만료시 재발급 요청
  //       if(errors[0].message === 'Reissue Token') {
  //         if(i === 0) {
  //           i++;
  //           tokenReissue({
  //             client: client,
  //             failureOperation: err.operation,
  //           });
  //           // # 중복으로 재발급 요청을 막기위해
  //           setTimeout(() => {
  //             i = 0;
  //           }, 20000)
  //         }
  //       } else {
  //         console.error(errors);
  //       }
        
  //     }
  //   } catch(e) {
  //     console.error(e);
  //   }
  // }
});


export default client;