import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
} from 'antd';

import {
  blank,
} from 'libs/utils';
import constants from 'libs/constants';
import Card from 'components/card';
import Articles from 'modules/articles';
import Cates from 'modules/cates';
import Tags from 'modules/tags';

class Article extends PureComponent {
  static propTypes = {
    onMount: PropTypes.func,
  };

  static defaultProps = {
    onMount: blank,
  };

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <Card>
        <Tabs
          defaultActiveKey={Article.VIEW_TYPE.ARTICLES}
        >
          <Tabs.TabPane
            tab="文章管理"
            key={Article.VIEW_TYPE.ARTICLES}
          >
            <Articles />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="类型管理"
            key={Article.VIEW_TYPE.CATES}
          >
            <Cates />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="标签管理"
            key={Article.VIEW_TYPE.TAGS}
          >
            <Tags />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    );
  }
}

Article.VIEW_TYPE = constants([
  'ARTICLES',
  'CATES',
  'TAGS',
], 'VIEW_TYPE_');

export default Article;
