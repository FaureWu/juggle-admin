import {
  createSelector,
} from 'reselect';

const stateSelector = state => state.products;

export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading,
);

export const errorSelector = createSelector(
  stateSelector,
  state => state.error,
);

export const dataSelector = createSelector(
  stateSelector,
  state => state.data
    .map(record => record.toJS())
    .toArray(),
);

export const totalSelector = createSelector(
  stateSelector,
  state => state.total,
);
