import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import {
  push,
} from 'react-router-redux';

import {
  rootRoute,
  loginRoute,
} from 'routes';
import {
  LOGIN,
  LOGOUT,
} from './type';
import {
  loginSuccess,
  loginFail,
  validateChange,
  validateReset,
} from './action';

const loginEpic = (
  action$,
  store,
  { endpoints, ajax },
) => action$
  .ofType(LOGIN.START)
  .map(() => endpoints.login)
  .mergeMap(url =>
    ajax({
      url,
      body: store
        .getState()
        .user.info
        .toJS(),
      crossDomain: true,
      method: 'POST',
      responseType: 'json',
    })
    .pluck('response')
    .map((response) => {
      if (response.code === 0) {
        window.localStorage.setItem('login', JSON.stringify(true));
        store.dispatch(loginSuccess());
        window.localStorage.setItem('token', response.data.token);
        return push(rootRoute.path);
      }

      window.localStorage.removeItem('login');
      store.dispatch(validateChange({ name: [response.msg] }));
      return loginFail();
    })
    .catch(() => Observable
      .of(loginFail()),
    ),
  );

const logoutEpic = (
  action$,
  store,
) => action$
  .ofType(LOGOUT.DONE)
  .map(() => {
    window.localStorage.removeItem('login');
    store.dispatch(validateReset());
    window.localStorage.removeItem('token');
    return push(loginRoute.path);
  });

export const epic = combineEpics(
  loginEpic,
  logoutEpic,
);
