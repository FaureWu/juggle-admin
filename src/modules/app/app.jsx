import React, {
  PureComponent,
} from 'react';
import {
  Route,
} from 'react-router-dom';

import {
  loginRoute,
  rootRoute,
} from 'routes';

import Switch from 'modules/switch';

const routes = [
  loginRoute,
  rootRoute,
];

class App extends PureComponent {
  render() {
    return (
      <Switch>
        {routes.map(({
          key,
          exact,
          strict,
          path,
          component,
        }) => (
          <Route
            key={key}
            exact={exact}
            strict={strict}
            path={path}
            component={component}
          />
        ))}
      </Switch>
    );
  }
}

export default App;
