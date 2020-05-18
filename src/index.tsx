import * as React from 'react'; // `@types/react`에 정의 되어 있는 형식이 commonjs 형식.
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import App from './App';

const Hot = hot(App); // react-hot-loader 적용

ReactDOM.render(
  <Hot />,
  document.getElementById("root")
);