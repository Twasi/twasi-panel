import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Redirect, withRouter } from 'react-router-dom';
import storage from 'local-storage';

import userInfoService from '../services/userInfo.service';
import { authSelectors, authOperations } from '../state/auth';

// 2 Hours
const tokenExpiration = 2 * 60 * 60 * 1000;

class Login extends React.Component {
  componentWillMount() {
    const { isAuthenticated, authenticate, updateUserData } = this.props;

    if (isAuthenticated) {
      return;
    }

    const urlParams = queryString.parse(window.location.search);

    if (urlParams.jwt) {
      authenticate(urlParams.jwt);
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

      authenticate(cacheData.token);
      userInfoService
        .get(cacheData.token)
        .then(data => {
          console.log(data);
          updateUserData(data);
        })
        .catch(() => {
          window.location.href = window.env.AUTH_URL;
        });
    }
  }

  render() {
    const { location, isAuthenticated } = this.props;
    return (
      <div>
        {isAuthenticated &&
          location.pathname === '/callback' && <Redirect to="/" />}
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  isAuthenticated: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.isAuthenticated(state)
});

const mapDispatchToProps = dispatch => ({
  authenticate: jwt => dispatch(authOperations.authenticate(jwt)),
  updateUserData: data => dispatch(authOperations.updateUserData(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
