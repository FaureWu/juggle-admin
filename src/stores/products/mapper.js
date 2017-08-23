import {
  List,
  Map,
} from 'immutable';
import uuidV4 from 'uuid/v4';

import Record from './record';

const parse = (data) => {
  const json = JSON.parse(data);

  return Object.keys(json)
    .reduce((map, key) =>
      map.set(key, json[key]),
      new Map());
};

export const mapper = data =>
  new Record({
    ...data,
    key: data.uuid || uuidV4(),
    attrs: parse(data.attrs),
    params: parse(data.params),
  });

export default datas => datas
  .reduce((list, data) => list
    .push(mapper(data)), new List());
