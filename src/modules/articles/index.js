import { connect } from 'react-redux';

import {
  get as getArticles,
  addValidateReset,
  deleteStart,
  editChange,
  editValidateReset,
  pageChange,
} from 'stores/articles';
import {
  open,
} from 'stores/modal';
import {
  loadingSelector,
  dataSelector,
  totalSelector,
  deleteSeletor,
  paginationSelector,
} from 'selectors/articles';
import {
  dataSelector as catesDataSelector,
} from 'selectors/cates';
import {
  dataSelector as tagsDataSelector,
} from 'selectors/tags';
import Articles from './articles';

const mapStateToProps = state => ({
  loading: loadingSelector(state),
  articles: dataSelector(state),
  total: totalSelector(state),
  cates: catesDataSelector(state),
  tags: tagsDataSelector(state),
  deleteKey: deleteSeletor(state),
  pagination: paginationSelector(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: ({ current, pageSize }) => {
    dispatch(pageChange(current, pageSize));
    dispatch(getArticles((current - 1) * pageSize, pageSize));
  },
  onAdd: (title, content) => {
    dispatch(addValidateReset());
    dispatch(open(title, content));
  },
  onEdit: (title, content, initData) => {
    dispatch(editChange(initData));
    dispatch(editValidateReset());
    dispatch(open(title, content));
  },
  onDelete: key => dispatch(deleteStart(key)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Articles);
