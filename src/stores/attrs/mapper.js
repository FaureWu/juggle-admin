import {
  Map,
} from 'immutable';
import uuid from 'uuid/v4';

import Record from './record';

export default datas => datas
  .reduce((map, {
    key: id,
    name,
    description,
  }) => {
    let key = id;
    if (key === undefined) {
      key = uuid();
    }

    return map.set(key, new Record({
      key,
      name,
      description,
    }));
  }, new Map());
