import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import {
  createEpicMiddleware,
} from 'redux-observable';
import {
  ajax,
} from 'rxjs/observable/dom/ajax';
import {
  routerMiddleware,
} from 'react-router-redux';

import rootReducer from 'stores/rootReducer';
import rootEpic from 'stores/rootEpic';
import {
  PRODUCTION,
} from 'defines';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const preloadState = window.__PRELOAD_STATE__ || {};
/* eslint-enable */

export default (configs, history) => {
  const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: {
      ...configs,
      ajax,
    },
  });

  const routeMiddleware = routerMiddleware(history);
  const middlewares = [epicMiddleware, routeMiddleware];
  const store = createStore(
    rootReducer,
    preloadState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  if (module.hot &&
    process.env.NODE_ENV !== PRODUCTION
  ) {
    module.hot.accept('stores/rootReducer', () =>
      store.replaceReducer(rootReducer),
    );
    module.hot.accept('stores/rootEpic', () =>
      epicMiddleware.replaceEpic(rootEpic),
    );
  }

  return store;
};
