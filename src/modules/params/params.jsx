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
} from 'defines';
import Tool from 'components/tool';
import Operater from 'components/operater';
import Add from 'modules/param';
import Edit from 'modules/param/edit';

import styles from './params.scss';

class Params extends PureComponent {
  static propTypes = {
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
    loading: PropTypes.bool,
    deleteKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    params: [],
    loading: false,
    deleteKey: '',
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
      key: 'description',
      title: '描述',
      dataIndex: 'description',
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
                confirm: '确认删除产品参数么？',
              },
            ]}
          />
        );
      },
    },
  ];

  add = () => this.props
    .onAdd('添加产品参数', <Add />);
  edit = data => this.props
    .onEdit('修改产品参数', <Edit />, data);
  delete = key => this.props
    .onDelete(key);
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
      params,
      loading,
    } = this.props;

    return (
      <Table
        className={styles.params}
        columns={this.columns}
        dataSource={params}
        loading={loading}
        title={this.renderTitle}
        pagination={PAGINATION}
        bordered
      />
    );
  }
}

export default Params;
