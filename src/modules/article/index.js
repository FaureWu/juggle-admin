import { connect } from 'react-redux';

import {
  addChange,
  addValidateChange,
  add as addArticle,
} from 'stores/articles';
import {
  close,
} from 'stores/modal';
import {
  addSelector,
} from 'selectors/articles';
import {
  dataSelector as catesDataSelector,
} from 'selectors/cates';
import Add from './add';

const mapStateToProps = (state) => {
  const add = addSelector(state);

  return {
    data: add.data.toJS(),
    validate: add.validate.toJS(),
    loading: add.loading,
    cates: catesDataSelector(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: data => dispatch(addChange(data)),
  onValidateChange: errors => dispatch(addValidateChange(errors)),
  onCancel: () => dispatch(close()),
  onSubmit: () => dispatch(addArticle()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Add);
