import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { authSelectors } from '../state/auth';
import FullpageLoader from '../views/common/FullpageLoader';
import Login from './Login';

class Auth extends Component {
  constructor(props) {
    super(props);

    window.testLocal = (address = 'http://localhost:3000/callback') => {
      window.open(`${address}?jwt=${this.props.jwt}`, '_blank');
    };
  }

  render() {
    const { children, isAuthenticated, isLoading } = this.props;

    const isOk = isAuthenticated && !isLoading;

    return (
      <div>
        <Login />
        {isOk && children}
        {!isOk && <FullpageLoader text="Authenticating, please wait..." />}
      </div>
    );
  }
}

Auth.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  isAuthenticated: PropTypes.bool.isRequired,
  jwt: PropTypes.string,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  jwt: authSelectors.getJwt(state),
  isAuthenticated: authSelectors.isAuthenticated(state),
  isLoading: authSelectors.isLoading(state)
});

export default withRouter(connect(mapStateToProps)(Auth));
