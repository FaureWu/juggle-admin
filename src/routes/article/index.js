import { connect } from 'react-redux';

import {
  get as getArticles,
} from 'stores/articles';
import {
  get as getCates,
} from 'stores/cates';
import {
  get as getTags,
} from 'stores/tags';
import {
  PAGINATION,
} from 'defines';

import Article from './article';

const mapStateToProps = () => ({

});

const mapDispatchToProps = dispatch => ({
  onMount: () => ([
    getCates(),
    getTags(),
    getArticles(
      (PAGINATION.defaultCurrent - 1) *
      PAGINATION.defaultPageSize,
      PAGINATION.defaultPageSize,
    ),
  ].map(dispatch)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Article);
