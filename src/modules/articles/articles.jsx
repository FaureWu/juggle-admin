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
  ARTICLE_STATUS,
} from 'defines';
import Tool from 'components/tool';
import Operater from 'components/operater';
import Add from 'modules/article';
import Edit from 'modules/article/edit';
import Expand from './expand';

import styles from './articles.scss';

class Articles extends PureComponent {
  static propTypes = {
    articles: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
        alias: PropTypes.string,
        cate: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        tags: PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]),
        ),
        picture: PropTypes.string,
        detail: PropTypes.string,
        status: PropTypes.oneOf(
          Object.keys(ARTICLE_STATUS)
            .map(key => ARTICLE_STATUS[key].value),
        ),
      }),
    ),
    cates: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
        intro: PropTypes.string,
      }),
    ),
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
        intro: PropTypes.string,
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
    articles: [],
    cates: [],
    tags: [],
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
      key: 'cate',
      title: '类型',
      dataIndex: 'cate',
      render: (text, record) => {
        const cate = this.props.cates
          .find(({ key }) => key === record.cate);

        return cate.name;
      },
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 150,
      render: (text, record) => {
        const status = Object.keys(ARTICLE_STATUS)
          .reduce((result, key) => ({
            ...result,
            [ARTICLE_STATUS[key].value]: ARTICLE_STATUS[key].label,
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
                confirm: '确认删除文章么？',
              },
            ]}
          />
        );
      },
    },
  ];

  add = () => this.props
    .onAdd('添加文章', <Add />);
  edit = data => this.props
    .onEdit('修改文章', <Edit />, data);
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
      tags={record.tags}
      tagNames={this.props.tags
        .reduce((result, tag) => ({
          ...result,
          [tag.key]: tag.name,
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
      articles,
      loading,
      total,
      onChange,
      pagination,
    } = this.props;

    return (
      <Table
        className={styles.articles}
        columns={this.columns}
        dataSource={articles}
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

export default Articles;
