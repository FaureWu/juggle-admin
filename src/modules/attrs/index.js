import { connect } from 'react-redux';

import {
  addValidateReset,
  editValidateReset,
  editChange,
  deleteStart,
} from 'stores/attrs';
import {
  open,
} from 'stores/modal';
import {
  loadingSelector,
  dataSelector,
  deleteSeletor,
} from 'selectors/attrs';
import Attrs from './attrs';

const mapStateToProps = state => ({
  loading: loadingSelector(state),
  attrs: dataSelector(state),
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
)(Attrs);
