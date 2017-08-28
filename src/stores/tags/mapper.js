import {
  List,
} from 'immutable';
import uuidV4 from 'uuid/v4';

import Record from './record';

export const mapper = data =>
  new Record({
    ...data,
    key: data.uuid || data.key || uuidV4(),
  });

export default datas => datas
  .reduce((list, data) => list
    .push(mapper(data)), new List());
