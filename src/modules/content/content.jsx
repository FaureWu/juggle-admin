import React, {
  PureComponent,
} from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import {
  mainRoutes,
  notFound,
} from 'routes';
import Switch from 'modules/switch';

class Content extends PureComponent {
  render() {
    return (
      <Switch>
        {mainRoutes
          .map(({
            key,
            path,
            exact,
            strict,
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
        <Redirect
          from="/"
          to={mainRoutes[0].path}
        />
        <Route
          key={notFound.key}
          component={notFound.component}
        />
      </Switch>
    );
  }
}

export default Content;
