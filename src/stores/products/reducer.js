import { combineReducers } from 'redux';
import {
  Map,
} from 'immutable';

import createReducer from 'libs/createReducer';
import {
  GET,
} from './type';
import mappers from './mapper';

export const reducer = combineReducers({
  loading: createReducer(false, {
    [GET.START]: () => true,
    [GET.SUCCESS]: () => false,
    [GET.FAIL]: () => false,
  }),
  data: createReducer(new Map(), {
    [GET.SUCCESS]: action =>
      mappers(action.payload.data),
  }),
  total: createReducer(0, {
    [GET.SUCCESS]: action => parseInt(action.payload.total, 10),
  }),
  error: createReducer(false, {
    [GET.FAIL]: action => action.payload,
    [GET.SUCCESS]: () => false,
  }),
});
