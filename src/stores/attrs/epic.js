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
  SUBMIT_HELP_KEY,
} from 'defines';
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
    url: `${endpoints.getAttrs}/0`,
    headers: {
      token: window.localStorage.getItem('token'),
    },
    crossDomain: true,
    method: 'GET',
    responseType: 'json',
  }))
  .mergeMap(request => ajax(request)
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
  .map(() => store.getState().attrs.add.data.toJS())
  .map(data => ({
    url: endpoints.addAttr,
    headers: {
      token: window.localStorage.getItem('token'),
    },
    body: {
      name: data.name,
      intro: data.intro,
    },
    method: 'POST',
    crossDomain: true,
    responseType: 'json',
  }))
  .mergeMap(request => ajax(request)
    .pluck('response')
    .map((response) => {
      if (response.code === 0) {
        store.dispatch(close());
        return addSuccess(response.data);
      }
      let errors = JSON.parse(response.msg);
      if (typeof errors === 'string') {
        errors = { [SUBMIT_HELP_KEY]: errors };
      }
      store.dispatch(addValidateChange(errors));
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
  .map(() => store.getState().attrs.edit.data.toJS())
  .map(data => ({
    url: `${endpoints.editAttr}/${data.key}`,
    headers: {
      token: window.localStorage.getItem('token'),
    },
    body: {
      name: data.name,
      intro: data.intro,
    },
    method: 'POST',
    crossDomain: true,
    responseType: 'json',
  }))
  .mergeMap(request => ajax(request)
    .pluck('response')
    .map((response) => {
      if (response.code === 0) {
        store.dispatch(close());
        const data = store.getState().attrs.edit.data.toJS();
        return editSuccess(data);
      }
      let errors = JSON.parse(response.msg);
      if (typeof errors === 'string') {
        errors = { [SUBMIT_HELP_KEY]: errors };
      }
      store.dispatch(editValidateChange(errors));
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
    url: `${endpoints.deleteAttr}/${key}`,
    headers: {
      token: window.localStorage.getItem('token'),
    },
    method: 'DELETE',
    crossDomain: true,
    responseType: 'json',
  }))
  .mergeMap(request => ajax(request)
    .pluck('response')
    .map(response =>
      response.code === 0 ?
      deleteSuccess(store.getState().attrs.delete) :
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
