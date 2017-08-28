import { connect } from 'react-redux';

import {
  editChange,
  editValidateChange,
  edit as editArticle,
} from 'stores/articles';
import {
  close,
} from 'stores/modal';
import {
  editSelector,
} from 'selectors/articles';
import {
  dataSelector as catesDataSelector,
} from 'selectors/cates';
import Add from './add';

const mapStateToProps = (state) => {
  const edit = editSelector(state);

  return {
    data: edit.data.toJS(),
    validate: edit.validate.toJS(),
    loading: edit.loading,
    cates: catesDataSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: data => dispatch(editChange(data)),
  onValidateChange: errors => dispatch(editValidateChange(errors)),
  onCancel: () => dispatch(close()),
  onSubmit: () => dispatch(editArticle()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Add);
