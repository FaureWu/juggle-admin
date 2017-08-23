import {
  List,
} from 'immutable';
import uuidV4 from 'uuid/v4';

import Record from './record';

export const mapper = ({
  uuid,
  name,
  description,
}) => new Record({
  key: uuid || uuidV4(),
  name,
  description,
});

export default datas => datas
  .reduce((list, data) => list
    .push(mapper(data)), new List());
