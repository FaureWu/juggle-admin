import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
} from 'antd';

import {
  blank,
} from 'libs/utils';
import logo from 'assets/logo.svg';

import styles from './header.scss';

class Header extends PureComponent {
  static propTypes = {
    onLogout: PropTypes.func,
  };

  static defaultProps = {
    onLogout: blank,
  };

  click = ({
    key,
  }) => {
    switch (key) {
      case 'logout':
        this.props.onLogout();
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <Menu
        className={styles.header}
        mode="horizontal"
        theme="dark"
        selectedKeys={[]}
        onClick={this.click}
      >
        <Menu.SubMenu
          title={(
            <div className={styles.user}>
              <img src={logo} alt="logo" />
            </div>
          )}
        >
          <Menu.Item key="user">个人设置</Menu.Item>
          <Menu.Item key="logout">退出登陆</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }
}

export default Header;
