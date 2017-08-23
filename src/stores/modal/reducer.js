import {
  Map,
} from 'immutable';

import createReducer from 'libs/createReducer';
import {
  MODAL,
} from './type';

export const reducer = createReducer(new Map(), {
  [MODAL.OPEN]: action =>
    new Map({ ...action.payload, visible: true }),
  [MODAL.CLOSE]: (action, state) =>
    state.set('visible', false),
});
