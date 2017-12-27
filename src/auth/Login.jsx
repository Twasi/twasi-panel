import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import jwtDecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import storage from 'local-storage';

import userInfoService from '../services/userInfo';

// 2 Hours
const tokenExpiration = 2 * 60 * 60 * 1000;

class Login extends React.Component {
  componentWillMount() {
    const { authenticate, isAuthenticated } = this.context;

    if (isAuthenticated) {
      return;
    }

    const urlParams = queryString.parse(window.location.search);

    if (urlParams.jwt) {
      authenticate(urlParams.jwt, jwtDecode(urlParams.jwt));
      storage('jwt', { token: urlParams.jwt, since: new Date().getTime() });
    } else {
      const cacheData = storage('jwt');

      if (
        typeof cacheData === 'undefined' ||
        cacheData === null ||
        cacheData.since < new Date().getTime() - tokenExpiration
      ) {
        window.location.href = window.env.AUTH_URL;
        return;
      }

      userInfoService(cacheData.token)()
        .then(() => {
          authenticate(cacheData.token, jwtDecode(cacheData.token));
        })
        .catch(() => {
          window.location.href = window.env.AUTH_URL;
        });
    }
  }

  render() {
    const { location } = this.props;
    return (
      <div>
        {this.context.isAuthenticated && location.pathname === '/callback' && <Redirect to="/" />}
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

Login.contextTypes = {
  authenticate: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default Login;
