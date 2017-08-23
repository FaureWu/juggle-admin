import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  Modal,
} from 'antd';

import {
  blank,
} from 'libs/utils';
import {
  loginRoute,
} from 'routes';
import Sider from 'modules/sider';
import Header from 'modules/header';
import Content from 'modules/content';
import styles from './main.scss';

class Main extends PureComponent {
  static propTypes = {
    modal: PropTypes.shape({
      title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
      content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
      visible: PropTypes.bool,
    }),
    navigate: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    modal: {},
    navigate: blank,
    onChange: blank,
  };

  componentDidMount() {
    const {
      navigate,
      onChange,
    } = this.props;

    const isLogin = JSON
      .parse(window.localStorage.getItem('login'));

    if (!isLogin) {
      navigate(loginRoute.path);
    } else {
      const user = JSON.parse(
        window.localStorage.getItem('user'));
      onChange(user);
    }
  }

  state = {
    collapsed: false,
  };

  collapse = collapsed => this.setState({ collapsed });

  render() {
    const {
      modal,
    } = this.props;
    const {
      collapsed,
    } = this.state;

    return (
      <Layout className={styles.container}>
        <Layout.Sider
          className={styles.sider}
          collapsible
          collapsed={collapsed}
          onCollapse={this.collapse}
          breakpoint="sm"
          collapsedWidth="65"
        >
          <Sider collapsed={collapsed} />
        </Layout.Sider>
        <Layout className={styles.layout}>
          <Layout.Header className={styles.header}>
            <Header />
          </Layout.Header>
          <Layout className={styles.scroll}>
            <Layout.Content className={styles.content}>
              <Content />
              <Modal
                title={modal.title}
                visible={modal.visible}
                footer={false}
                closable={false}
              >{modal.content}</Modal>
            </Layout.Content>
            <Layout.Footer className={styles.footer}>footer</Layout.Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Main;
