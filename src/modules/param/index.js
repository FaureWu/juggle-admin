import { connect } from 'react-redux';

import {
  addChange,
  addValidateChange,
  add as addParam,
} from 'stores/params';
import {
  close,
} from 'stores/modal';
import {
  addSelector,
} from 'selectors/params';
import Add from './add';

const mapStateToProps = (state) => {
  const add = addSelector(state);

  return {
    data: add.data.toJS(),
    validate: add.validate.toJS(),
    loading: add.loading,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: data => dispatch(addChange(data)),
  onValidateChange: errors => dispatch(addValidateChange(errors)),
  onCancel: () => dispatch(close()),
  onSubmit: () => dispatch(addParam()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Add);
