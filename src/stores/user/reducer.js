import { combineReducers } from 'redux';
import {
  Map,
} from 'immutable';

import createReducer from 'libs/createReducer';
import {
  VALIDATE_STATUS,
  VALIDATE_DESCRIPTION,
  SUBMIT_HELP_KEY,
} from 'defines';
import {
  INFO,
  VALIDATE,
  LOGIN,
} from './type';

const userInitState = {
  name: '',
  password: '',
  remember: false,
};

const userValidateState = {
  name: VALIDATE_DESCRIPTION.set('required', true),
  password: VALIDATE_DESCRIPTION.set('required', true),
  [SUBMIT_HELP_KEY]: VALIDATE_DESCRIPTION.set('required', false)
    .set('hasFeedback', false),
};

export const reducer = combineReducers({
  info: createReducer(new Map(userInitState), {
    [INFO.CHANGE]: (action, state) => {
      const data = action.payload;

      return Object.keys(data)
        .reduce((newState, key) =>
          newState.set(key, data[key]),
          state);
    },
  }),
  loading: createReducer(false, {
    [LOGIN.START]: () => true,
    [LOGIN.SUCCESS]: () => false,
    [LOGIN.FAIL]: () => false,
  }),
  validate: createReducer(new Map(userValidateState), {
    [VALIDATE.RESET]: () => new Map(userValidateState),
    [VALIDATE.CHANGE]: (action, state) => {
      const errors = action.payload;

      return state.map((validate, key) => {
        const error = errors[key];

        if (error) {
          return validate.set('help', error)
            .set('validateStatus', VALIDATE_STATUS.ERROR);
        }

        return validate.set('help', undefined)
          .set('extra', undefined)
          .set('validateStatus', VALIDATE_STATUS.SUCCESS);
      });
    },
  }),
});
