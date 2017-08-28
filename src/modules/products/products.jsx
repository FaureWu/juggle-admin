import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import {
  Table,
} from 'antd';

import {
  blank,
} from 'libs/utils';
import {
  PAGINATION,
  PRODUCT_STATUS,
} from 'defines';
import Tool from 'components/tool';
import Operater from 'components/operater';
import Add from 'modules/product';
import Edit from 'modules/product/edit';
import Expand from './expand';

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
            .map(key => PRODUCT_STATUS[key].value),
        ),
      }),
    ),
    attrs: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
    params: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
    deleteKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    pagination: PropTypes.shape({
      size: PropTypes.number,
      current: PropTypes.number,
    }),
    loading: PropTypes.bool,
    total: PropTypes.number,
    onChange: PropTypes.func,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    products: [],
    attrs: [],
    params: [],
    loading: false,
    deleteKey: '',
    pagination: {
      pageSize: PAGINATION.defaultPageSize,
      current: PAGINATION.defaultCurrent,
    },
    total: 0,
    onChange: blank,
    onAdd: blank,
    onEdit: blank,
    onDelete: blank,
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
        const status = Object.keys(PRODUCT_STATUS)
          .reduce((result, key) => ({
            ...result,
            [PRODUCT_STATUS[key].value]: PRODUCT_STATUS[key].label,
          }), {});

        if (status[record.status]) {
          return status[record.status];
        }

        return text;
      },
    },
    {
      key: 'operator',
      title: '操作',
      dataIndex: '',
      width: 80,
      render: (text, record) => {
        const { deleteKey } = this.props;

        if (record.key === deleteKey) {
          return (<Operater operaters={[Operater.OPERATER.PEDDING]} />);
        }

        return (
          <Operater
            onClick={type => this.click(type, record)}
            operaters={[
              Operater.OPERATER.EDIT,
              {
                type: Operater.OPERATER.DELETE,
                danger: true,
                confirm: '确认删除产品么？',
              },
            ]}
          />
        );
      },
    },
  ];

  add = () => this.props
    .onAdd('添加产品', <Add />);
  edit = data => this.props
    .onEdit('修改产品', <Edit />, data);
  delete = key => this.props
    .onDelete(key);
  renderTitle = () => (
    <div className={styles.title}>
      <Tool
        type="plus"
        onClick={this.add}
      />
    </div>
  );
  expandedRowRender = record =>
    (<Expand
      picture={record.picture}
      attrs={record.attrs}
      params={record.params}
      url={record.url}
      attrNames={this.props.attrs
        .reduce((result, attr) => ({
          ...result,
          [attr.key]: attr.name,
        }), {})}
      paramNames={this.props.params
        .reduce((result, param) => ({
          ...result,
          [param.key]: param.name,
        }), {})}
    />);
  click = (type, data) => {
    switch (type) {
      case Operater.OPERATER.EDIT:
        this.edit(data);
        break;
      case Operater.OPERATER.DELETE:
        this.delete(data.key);
        break;
      default:
        break;
    }
  };

  render() {
    const {
      products,
      loading,
      total,
      onChange,
      pagination,
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
          ...pagination,
          total,
        }}
        expandedRowRender={this.expandedRowRender}
        onChange={onChange}
        bordered
      />
    );
  }
}

export default Products;
