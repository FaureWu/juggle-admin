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
import {
  epic as articles,
} from 'stores/articles';
import {
  epic as cates,
} from 'stores/cates';
import {
  epic as tags,
} from 'stores/tags';

export default combineEpics(
  user,
  products,
  attrs,
  params,
  articles,
  cates,
  tags,
);
