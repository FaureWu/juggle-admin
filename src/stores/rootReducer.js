import { combineReducers } from 'redux';
import {
  routerReducer as router,
} from 'react-router-redux';

import {
  reducer as modal,
} from 'stores/modal';
import {
  reducer as user,
} from 'stores/user';
import {
  reducer as products,
} from 'stores/products';
import {
  reducer as attrs,
} from 'stores/attrs';
import {
  reducer as params,
} from 'stores/params';

export default combineReducers({
  router,
  modal,
  user,
  products,
  attrs,
  params,
});
