import React from 'react';
import PropTypes from 'prop-types';

import './_style.css';

const Content = ({ children, className }) => <div className={"siteContent " + className}>{children}</div>;

Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Content;
