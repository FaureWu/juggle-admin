import { connect } from 'react-redux';

import Home from './home';

const mapStateToProps = state => ({
  info: state.user.info.toJS(),
});

const mapDispatchToProps = () => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
