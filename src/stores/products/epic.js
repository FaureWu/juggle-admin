import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import {
  GET,
} from './type';
import {
  getSuccess,
  getFail,
} from './action';

const getEpic = (
  action$,
  store,
  { endpoints, ajax },
) => action$
  .ofType(GET.START)
  .pluck('payload')
  .map(payload => ({
    headers: {
      token: window.localStorage.getItem('token'),
    },
    url: `${endpoints.getProducts}/${payload.pos}/${payload.count}`,
  }))
  .mergeMap(request =>
    ajax({
      ...request,
      method: 'GET',
      crossDomain: true,
      responseType: 'json',
    })
    .pluck('response')
    .map(response =>
      response.code === 0 ?
      getSuccess(response.data, response.count) :
      getFail(response.msg),
    )
    .catch(error => Observable.of(getFail(error))),
  );

export const epic = combineEpics(
  getEpic,
);

