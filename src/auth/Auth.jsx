import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import FullpageLoader from '../views/common/FullpageLoader';

import Login from './Login';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      jwt: null,
      user: {}
    };
  }

  getChildContext() {
    return {
      user: this.state.user,
      jwt: this.state.jwt,
      isAuthenticated: this.state.isAuthenticated,
      authenticate: (jwt, user) => {
        this.setState({ user, jwt, isAuthenticated: true });
      }
    };
  }

  render() {
    const { children } = this.props;
    const { isAuthenticated } = this.state;

    return (
      <div>
        <Route path="/callback" component={Login} />
        {isAuthenticated && children}
        {!isAuthenticated && <FullpageLoader text="Authenticating, please wait..." />}
      </div>
    );
  }
}

Auth.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

Auth.childContextTypes = {
  user: PropTypes.shape({}),
  jwt: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  authenticate: PropTypes.func
};

export default Auth;
