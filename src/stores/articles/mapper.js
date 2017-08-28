import {
  List,
} from 'immutable';
import uuidV4 from 'uuid/v4';

import Record from './record';

const parse = (data) => {
  let json;
  try {
    json = JSON.parse(data);
  } catch (error) {
    json = [];
  }

  return new List(json);
};

export const mapper = data =>
  new Record({
    ...data,
    key: data.uuid || data.key || uuidV4(),
    tags: parse(data.tags),
    status: `${data.status}`,
  });

export default datas => datas
  .reduce((list, data) => list
    .push(mapper(data)), new List());
