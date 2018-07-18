import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { authSelectors } from '../state/auth';
import FullpageLoader from '../views/common/FullpageLoader';

class AuthLoader extends Component {
  render() {
    const { children, isLoading } = this.props;

    return (
      <div>
        {!isLoading && children}
        {isLoading && <FullpageLoader text="Authenticating, hold on..." />}
      </div>
    );
  }
}

AuthLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isLoading: authSelectors.isLoading(state)
});

export default withRouter(connect(mapStateToProps)(AuthLoader));
