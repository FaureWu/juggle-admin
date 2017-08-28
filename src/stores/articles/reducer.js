import { combineReducers } from 'redux';
import {
  Map,
  List,
} from 'immutable';

import createReducer from 'libs/createReducer';
import {
  VALIDATE_STATUS,
  VALIDATE_DESCRIPTION,
  ARTICLE_STATUS,
  PAGINATION,
  SUBMIT_HELP_KEY,
} from 'defines';
import {
  GET,
  ADD,
  ADD_VALIDATE,
  DELETE,
  EDIT,
  EDIT_VALIDATE,
  PAGE,
} from './type';
import mappers, {
  mapper,
} from './mapper';

const addInitState = {
  name: '',
  alias: '',
  cate: '',
  tags: new List(),
  picture: '',
  detail: '',
  status: ARTICLE_STATUS.SHOW.value,
};

const validateState = {
  name: VALIDATE_DESCRIPTION.set('required', true),
  cate: VALIDATE_DESCRIPTION.set('required', true),
  picture: VALIDATE_DESCRIPTION.set('required', true),
  [SUBMIT_HELP_KEY]: VALIDATE_DESCRIPTION.set('required', false)
    .set('hasFeedback', false),
};

const addReducer = combineReducers({
  data: createReducer(new Map(addInitState), {
    [ADD.CHANGE]: (action, state) => {
      const data = action.payload;

      return Object.keys(data)
        .reduce((newState, key) =>
          newState.set(key, data[key]),
          state);
    },
    [ADD.SUCCESS]: () => new Map(addInitState),
  }),
  loading: createReducer(false, {
    [ADD.START]: () => true,
    [ADD.SUCCESS]: () => false,
    [ADD.FAIL]: () => false,
  }),
  validate: createReducer(new Map(validateState), {
    [ADD_VALIDATE.RESET]: () => new Map(validateState),
    [ADD_VALIDATE.CHANGE]: (action, state) => {
      const errors = action.payload;

      return state.map((validate, key) => {
        const error = errors[key];

        if (error) {
          return validate.set('help', error[0])
            .set('extra', error[1])
            .set('validateStatus', VALIDATE_STATUS.ERROR);
        }

        return validate.set('help', undefined)
          .set('extra', undefined)
          .set('validateStatus', VALIDATE_STATUS.SUCCESS);
      });
    },
  }),
});

const editInitState = {
  ...addInitState,
  key: undefined,
};

const editReducer = combineReducers({
  data: createReducer(new Map(editInitState), {
    [EDIT.CHANGE]: (action, state) => {
      const data = action.payload;

      return Object.keys(data)
        .reduce((newState, key) =>
          newState.set(key, data[key]),
          state);
    },
    [EDIT.SUCCESS]: () => new Map(editInitState),
  }),
  loading: createReducer(false, {
    [EDIT.START]: () => true,
    [EDIT.SUCCESS]: () => false,
    [EDIT.FAIL]: () => false,
  }),
  validate: createReducer(new Map(validateState), {
    [EDIT_VALIDATE.RESET]: () => new Map(validateState),
    [EDIT_VALIDATE.CHANGE]: (action, state) => {
      const errors = action.payload;

      return state.map((validate, key) => {
        const error = errors[key];

        if (error) {
          return validate.set('help', error[0])
            .set('extra', error[1])
            .set('validateStatus', VALIDATE_STATUS.ERROR);
        }

        return validate.set('help', undefined)
          .set('extra', undefined)
          .set('validateStatus', VALIDATE_STATUS.SUCCESS);
      });
    },
  }),
});

const pagination = {
  pageSize: PAGINATION.defaultPageSize,
  current: PAGINATION.defaultCurrent,
};

export const reducer = combineReducers({
  loading: createReducer(false, {
    [GET.START]: () => true,
    [GET.SUCCESS]: () => false,
    [GET.FAIL]: () => false,
  }),
  data: createReducer(new List(), {
    [GET.SUCCESS]: action =>
      mappers(action.payload.data),
    [ADD.SUCCESS]: (action, state) =>
      state.unshift(mapper(action.payload)),
    [EDIT.SUCCESS]: (action, state) =>
      state.update(
        state.findIndex(record =>
          record.key === action.payload.key),
        () => mapper(action.payload),
      ),
    [DELETE.SUCCESS]: (action, state) =>
      state.delete(
        state.findIndex(record =>
          record.key === action.payload),
      ),
  }),
  total: createReducer(0, {
    [GET.SUCCESS]: action => parseInt(action.payload.total, 10),
  }),
  error: createReducer(false, {
    [GET.FAIL]: action => action.payload,
    [GET.SUCCESS]: () => false,
  }),
  add: addReducer,
  edit: editReducer,
  delete: createReducer('', {
    [DELETE.START]: action => action.payload,
    [DELETE.FAIL]: () => '',
    [DELETE.SUCCESS]: () => '',
  }),
  pagination: createReducer(new Map(pagination), {
    [PAGE.CHANGE]: (action, state) =>
      state.set('pageSize', action.payload.pageSize)
        .set('current', action.payload.current),
  }),
});
