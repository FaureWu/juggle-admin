import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import {
  Menu as AntdMenu,
  Icon,
} from 'antd';

import {
  mainRoutes as routes,
} from 'routes';

class Menu extends PureComponent {
  static propTypes = {
    collapsed: PropTypes.bool,
    selectedKeys: PropTypes.array,
    navigate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    collapsed: false,
    selectedKeys: [],
  };

  render() {
    const {
      collapsed,
      selectedKeys,
      navigate,
    } = this.props;

    return (
      <AntdMenu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        selectedKeys={selectedKeys}
        onClick={navigate}
      >
        {routes
          .map(({
            path,
            icon,
            title,
          }) => (
            <AntdMenu.Item key={path}>
              <Icon type={icon} />
              <span>{title}</span>
            </AntdMenu.Item>
          ))}
      </AntdMenu>
    );
  }
}

export default Menu;
