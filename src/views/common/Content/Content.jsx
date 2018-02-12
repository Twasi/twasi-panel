import React from 'react';
import PropTypes from 'prop-types';

import { getContentStyle } from './_style';

const Content = ({ children }) => <div style={getContentStyle()}>{children}</div>;

Content.propTypes = {
  children: PropTypes.element
};

export default Content;
