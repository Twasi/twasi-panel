import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import jwtDecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';

import config from '../config';

class Login extends React.Component {
  componentWillMount() {
    const { authenticate } = this.context;
    const urlParams = queryString.parse(window.location.search);

    if (urlParams.jwt) {
      authenticate(urlParams.jwt, jwtDecode(urlParams.jwt));
    } else {
      window.location.href = config.auth_url;
    }
  }

  render() {
    const { location } = this.props;
    return (
      <div>
        {this.context.isAuthenticated &&
          location.pathname !== '/' && <Redirect to="/" />}
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
