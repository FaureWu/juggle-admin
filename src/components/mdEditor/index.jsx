import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import LZEditor from 'react-lz-editor';

import {
  blank,
} from 'libs/utils';

const defaults = {
  undoRedo: false,
  removeStyle: false,
  pasteNoStyle: false,
  blockStyle: false,
  alignment: false,
  inlineStyle: false,
  color: false,
  image: false,
  video: false,
  urls: false,
  fullScreen: false,
};

class MDEditor extends PureComponent {
  static propTypes = {
    tools: PropTypes.arrayOf(
      PropTypes.oneOf(Object.keys(defaults)),
    ),
    content: PropTypes.string,
    autoSave: PropTypes.bool,
    uploadProps: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    tools: [
      'pasteNoStyle',
      'blockStyle',
      'alignment',
      'inlineStyle',
      'color',
      'urls',
    ],
    content: '',
    autoSave: true,
    uploadProps: undefined,
    onChange: blank,
  };

  render() {
    const {
      content,
      autoSave,
      uploadProps,
      onChange,
      tools,
    } = this.props;

    const settings = tools.reduce((props, tool) => ({
      ...props,
      [tool]: true,
    }), defaults);

    return (
      <LZEditor
        {...settings}
        active={false}
        importContent={content}
        cbRecevier={onChange}
        autoSave={autoSave}
        uploadProps={uploadProps}
        convertFormat="markdown"
      />
    );
  }
}

export default MDEditor;
