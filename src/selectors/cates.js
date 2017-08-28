import {
  createSelector,
} from 'reselect';

const stateSelector = state => state.cates;

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

export const addSelector = createSelector(
  stateSelector,
  state => state.add,
);

export const editSelector = createSelector(
  stateSelector,
  state => state.edit,
);

export const deleteSeletor = createSelector(
  stateSelector,
  state => state.delete,
);
