import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import {
  ConnectedRouter,
} from 'react-router-redux';
import { Provider } from 'react-redux';

import createStore from 'stores';
import App from 'modules/app';
import configs from 'configs';
import 'styles/theme/antd.less';
import './index.scss';

const history = createHistory();
const store = createStore(configs, history);

const renderApp = () =>
  render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );

renderApp();

if (module.hot) {
  module.hot.accept('modules/app', () => renderApp());
}
