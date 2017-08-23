import { connect } from 'react-redux';

import {
  editChange,
  editValidateChange,
  edit as editAttr,
} from 'stores/attrs';
import {
  close,
} from 'stores/modal';
import {
  editSelector,
} from 'selectors/attrs';
import Add from './add';

const mapStateToProps = (state) => {
  const edit = editSelector(state);

  return {
    data: edit.data.toJS(),
    validate: edit.validate.toJS(),
    loading: edit.loading,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: data => dispatch(editChange(data)),
  onValidateChange: errors => dispatch(editValidateChange(errors)),
  onCancel: () => dispatch(close()),
  onSubmit: () => dispatch(editAttr()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Add);
