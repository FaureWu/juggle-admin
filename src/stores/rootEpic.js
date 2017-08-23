import { combineEpics } from 'redux-observable';

import {
  epic as user,
} from 'stores/user';
import {
  epic as products,
} from 'stores/products';
import {
  epic as attrs,
} from 'stores/attrs';
import {
  epic as params,
} from 'stores/params';

export default combineEpics(
  user,
  products,
  attrs,
  params,
);
