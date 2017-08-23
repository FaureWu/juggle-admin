import {
  Map,
} from 'immutable';
import uuid from 'uuid/v4';

import Record from './record';

const mapper = data =>
  Object.keys(JSON.stringify(data))
    .reduce((map, key) =>
      map.set(key, data[key]),
      new Map());

export default datas => datas
  .reduce((map, {
    key: id,
    name,
    code,
    attrs,
    params,
    alias,
    picture,
    url,
    detail,
    status,
  }) => {
    let key = id;
    if (key === undefined) {
      key = uuid();
    }

    return map.set(key, new Record({
      key,
      name,
      code,
      alias,
      picture,
      url,
      detail,
      status,
      attrs: mapper(attrs),
      params: mapper(params),
    }));
  }, new Map());
