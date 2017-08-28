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
import {
  reducer as articles,
} from 'stores/articles';
import {
  reducer as cates,
} from 'stores/cates';
import {
  reducer as tags,
} from 'stores/tags';

export default combineReducers({
  router,
  modal,
  user,
  products,
  attrs,
  params,
  articles,
  cates,
  tags,
});
