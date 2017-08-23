import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import {
  Table,
} from 'antd';

import {
  PAGINATION,
  PRODUCT_STATUS,
} from 'defines';
import Tool from 'components/tool';

import styles from './products.scss';

class Products extends PureComponent {
  static propTypes = {
    products: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
        code: PropTypes.string,
        attrs: PropTypes.object,
        params: PropTypes.object,
        alias: PropTypes.string,
        picture: PropTypes.string,
        url: PropTypes.string,
        detail: PropTypes.string,
        status: PropTypes.oneOf(
          Object.keys(PRODUCT_STATUS)
            .map(key => PRODUCT_STATUS[key]),
        ),
      }),
    ),
    loading: PropTypes.bool,
    total: PropTypes.number,
  };

  static defaultProps = {
    products: [],
    loading: false,
    total: 0,
  };

  columns = [
    {
      key: 'name',
      title: '名称',
      dataIndex: 'name',
      width: 150,
    },
    {
      key: 'alias',
      title: '别名',
      dataIndex: 'alias',
      width: 150,
    },
    {
      key: 'code',
      title: '编号',
      dataIndex: 'code',
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 150,
      render: (text, record) => {
        switch (record.status) {
          case PRODUCT_STATUS.ONLINE:
            return '已上架';
          case PRODUCT_STATUS.OFFLINE:
            return '已下架';
          case PRODUCT_STATUS.HOTLINE:
            return '已推荐';
          default:
            return text;
        }
      },
    },
  ];

  renderTitle = () => (
    <div className={styles.title}>
      <Tool
        type="plus"
        onClick={this.add}
      />
    </div>
  );

  render() {
    const {
      products,
      loading,
      total,
    } = this.props;

    return (
      <Table
        className={styles.products}
        columns={this.columns}
        dataSource={products}
        loading={loading}
        title={this.renderTitle}
        pagination={{
          ...PAGINATION,
          total,
        }}
        bordered
      />
    );
  }
}

export default Products;
