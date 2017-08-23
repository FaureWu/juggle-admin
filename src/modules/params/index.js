import { connect } from 'react-redux';

import {
  addValidateReset,
  editValidateReset,
  editChange,
  deleteStart,
} from 'stores/params';
import {
  open,
} from 'stores/modal';
import {
  loadingSelector,
  dataSelector,
  deleteSeletor,
} from 'selectors/params';
import Params from './params';

const mapStateToProps = state => ({
  loading: loadingSelector(state),
  params: dataSelector(state),
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
)(Params);
