import { combineReducers } from 'redux';
import {
  Map,
} from 'immutable';

import createReducer from 'libs/createReducer';
import {
  VALIDATE_STATUS,
  VALIDATE_DESCRIPTION,
} from 'defines';
import {
  GET,
  ADD,
  EDIT,
  DELETE,
  ADD_VALIDATE,
  EDIT_VALIDATE,
} from './type';
import mapper from './mapper';

const addInitState = {
  name: '',
  description: '',
};

const validateState = {
  name: VALIDATE_DESCRIPTION.set('required', true),
  description: VALIDATE_DESCRIPTION.set('required', false),
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

export const reducer = combineReducers({
  loading: createReducer(false, {
    [GET.START]: () => true,
    [GET.SUCCESS]: () => false,
    [GET.FAIL]: () => false,
  }),
  data: createReducer(new Map(), {
    [GET.SUCCESS]: action =>
      mapper(action.payload),
    [ADD.SUCCESS]: (action, state) =>
      state.merge(mapper([action.payload])),
    [EDIT.SUCCESS]: (action, state) =>
      state.merge(mapper([action.payload])),
    [DELETE.SUCCESS]: (action, state) =>
      state.delete(action.payload),
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
});
