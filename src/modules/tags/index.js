import { connect } from 'react-redux';

import {
  addValidateReset,
  editValidateReset,
  editChange,
  deleteStart,
} from 'stores/tags';
import {
  open,
} from 'stores/modal';
import {
  loadingSelector,
  dataSelector,
  deleteSeletor,
} from 'selectors/tags';
import Tags from './tags';

const mapStateToProps = state => ({
  loading: loadingSelector(state),
  tags: dataSelector(state),
  deleteKey: deleteSeletor(state),
});

const mapDispatchToProps = dispatch => ({
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
)(Tags);
