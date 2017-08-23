import { connect } from 'react-redux';

import {
  logout,
} from 'stores/user';
import Header from './header';

const mapStateToProps = () => ({

});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
