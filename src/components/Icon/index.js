import React from 'react';
import PropTypes from 'prop-types';

const Icon = props => {

  const iconCSS = `icon${
    props.small ? ' is-small' : ''
  }${
    props.medium ? ' is-medium' : ''
  }${
    props.large ? ' is-large' : ''
  }${
    props.left ? ' is-left' : ''
  }${
    props.right ? ' is-right' : ''
  }${
    props.hidden ? ' is-invisible' : ''
  }`;

  const fontType = (props.fal)?'fal':'fas'

  return (
    <span className={iconCSS}>
      <i className={fontType+' fa-' + props.name}></i>
    </span>
  );

};

Icon.propTypes = {};

export default Icon;
