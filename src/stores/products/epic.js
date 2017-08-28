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
  paginationSelector,
} from 'selectors/products';
import {
  SUBMIT_HELP_KEY,
} from 'defines';
import {
  GET,
  ADD,
  DELETE,
  EDIT,
} from './type';
import {
  getSuccess,
  getFail,
  addSuccess,
  addFail,
  addValidateChange,
  deleteSuccess,
  deleteFail,
  editSuccess,
  editValidateChange,
  editFail,
  get,
} from './action';

const getEpic = (
  action$,
  store,
  { endpoints, ajax },
) => action$
  .ofType(GET.START)
  .pluck('payload')
  .map(payload => ({
    url: `${endpoints.getProducts}/${payload.pos}/${payload.count}`,
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
      getSuccess(response.data, response.count) :
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
  .map(() => store.getState().products.add.data.toJS())
  .map(data => ({
    url: endpoints.addProduct,
    headers: {
      token: window.localStorage.getItem('token'),
    },
    body: {
      ...data,
      attrs: JSON.stringify(data.attrs),
      params: JSON.stringify(data.params),
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
  .map(() => store.getState().products.edit.data.toJS())
  .map(data => ({
    url: `${endpoints.editProduct}/${data.key}`,
    headers: {
      token: window.localStorage.getItem('token'),
    },
    body: {
      ...data,
      attrs: JSON.stringify(data.attrs),
      params: JSON.stringify(data.params),
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
        const data = store.getState().products.edit.data.toJS();
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
    url: `${endpoints.deleteProduct}/${key}`,
    headers: {
      token: window.localStorage.getItem('token'),
    },
    method: 'DELETE',
    crossDomain: true,
    responseType: 'json',
  }))
  .mergeMap(request => ajax(request)
    .pluck('response')
    .map((response) => {
      if (response.code === 0) {
        const {
          pageSize,
          current,
        } = paginationSelector(store.getState());
        store.dispatch(deleteSuccess());
        return get((current - 1) * pageSize, pageSize);
      }

      return deleteFail(response.msg);
    })
    .catch(error => Observable.of(deleteFail(error))),
  );

export const epic = combineEpics(
  getEpic,
  addEpic,
  editEpic,
  deleteEpic,
);

