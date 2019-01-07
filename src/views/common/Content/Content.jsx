import React from 'react';
import PropTypes from 'prop-types';

import { getContentStyle } from './_style';

const Content = ({ children, className }) => <div style={getContentStyle()} className={className}>{children}</div>;

Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Content;
