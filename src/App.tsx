import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'react-carrot-ui';

import client from './modules';
import Routes from './routes';

const App: React.FunctionComponent = () => {
  
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