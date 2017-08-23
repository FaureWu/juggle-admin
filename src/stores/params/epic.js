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
  close,
} from 'stores/modal';
import {
  GET,
  ADD,
  EDIT,
  DELETE,
} from './type';
import {
  getSuccess,
  getFail,
  addSuccess,
  addFail,
  addValidateChange,
  editSuccess,
  editFail,
  editValidateChange,
  deleteSuccess,
  deleteFail,
} from './action';

const getEpic = (
  action$,
  store,
  { endpoints, ajax },
) => action$
  .ofType(GET.START)
  .map(() => ({
    headers: {
      token: window.localStorage.getItem('token'),
    },
    url: endpoints.getParams,
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
      getSuccess(response.data) :
      getFail(response.msg),
    )
    .catch(error => Observable.of(getFail(error))),
  );

const addEpic = (
  action$,
  store,
  { endpoints, ajax },
) => action$
  .ofType(ADD.START)
  .map(() => ({
    headers: {
      token: window.localStorage.getItem('token'),
    },
    url: endpoints.addParam,
    body: store.getState().params.add.data.toJS(),
  }))
  .mergeMap(request =>
    ajax({
      ...request,
      method: 'POST',
      crossDomain: true,
      responseType: 'json',
    })
    .pluck('response')
    .map((response) => {
      if (response.code === 0) {
        store.dispatch(close());
        return addSuccess(response.data);
      }

      store.dispatch(addValidateChange({ name: [response.msg] }));
      return addFail(response.msg);
    })
    .catch(error => Observable.of(addFail(error))),
  );

const editEpic = (
  action$,
  store,
  { endpoints, ajax },
) => action$
  .ofType(EDIT.START)
  .map(() => {
    const data = store.getState().params.edit.data.toJS();
    return {
      headers: {
        token: window.localStorage.getItem('token'),
      },
      url: `${endpoints.editParam}/${data.key}`,
      body: data,
    };
  })
  .mergeMap(request =>
    ajax({
      ...request,
      method: 'POST',
      crossDomain: true,
      responseType: 'json',
    })
    .pluck('response')
    .map((response) => {
      if (response.code === 0) {
        store.dispatch(close());
        return editSuccess(response.data);
      }

      store.dispatch(editValidateChange({ name: [response.msg] }));
      return editFail(response.msg);
    })
    .catch(error => Observable.of(editFail(error))),
  );

const deleteEpic = (
  action$,
  store,
  { endpoints, ajax },
) => action$
  .ofType(DELETE.START)
  .pluck('payload')
  .map(key => ({
    headers: {
      token: window.localStorage.getItem('token'),
    },
    url: `${endpoints.deleteParam}/${key}`,
  }))
  .mergeMap(request =>
    ajax({
      ...request,
      method: 'DELETE',
      crossDomain: true,
      responseType: 'json',
    })
    .pluck('response')
    .map(response =>
      response.code === 0 ?
      deleteSuccess(response.data.key) :
      deleteFail(response.msg),
    )
    .catch(error => Observable.of(deleteFail(error))),
  );

export const epic = combineEpics(
  getEpic,
  addEpic,
  editEpic,
  deleteEpic,
);
