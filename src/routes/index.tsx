import React, { useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthRoute from '../components/mocules/AuthRoute';
import Home from '../components/pages/Home';

import CategoryWrite from '../components/pages/CategoryWrite';
import CategoryUpdate from '../components/pages/CategoryUpdate';

import Todos from '../components/pages/Todos';
import TodoWrite from '../components/pages/TodoWrite';
import TodoUpdate from '../components/pages/TodoUpdate';

function Routes() {

  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <AuthRoute 
        path="/category/write" 
        component={CategoryWrite}  
        failuerePath="/" 
      />
      <Route path="/category/update/:id" component={CategoryUpdate} />

      <Route exact path="/todos/:category_id" component={Todos} />
      <Route path="/todo/write/:category_id" component={TodoWrite} />
      <Route path="/todo/update/:id" component={TodoUpdate} />

    </Switch>
  )
}

export default Routes;