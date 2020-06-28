import * as React from 'react';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'react-carrot-ui';

import client from './graphql';
import Routes from './routes';
import { GET_INITIALIZE_DATA } from './graphql/common/query';

const App: React.FunctionComponent = () => {

  // # 마운트
  useEffect(() => {
    // console.log('> mount: ')
    // # 초기화
    client.query({
      query: GET_INITIALIZE_DATA,
    })
    .then((res) => {
      // console.log('> initialize data\n',res.data);
      if(res.data.myInfo) {
        // # 초기 데이터 입력
        client.writeData({
          data: {
            user: res.data.myInfo,
            categories: res.data.categoriesAll
          }
        })
      }
    })
    .catch(e => console.error('> inifialize failure\n',e));
    
  }, [])
  
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ThemeProvider primaryColor="white">
            <Routes />
          </ThemeProvider>
        </ApolloProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
};

export default App;