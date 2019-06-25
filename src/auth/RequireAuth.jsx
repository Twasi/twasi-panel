import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import storage from 'local-storage';

import { authSelectors, authOperations } from '../state/auth';
import { getRawGraph } from '../services/graphqlService';
import { userGraphString } from './Login';

// 2 Hours
const tokenExpiration = 2 * 60 * 60 * 1000;

class RequireAuth extends React.Component {
  componentWillMount() {
    const { isAuthenticated, isLoading, authenticate, updateIsLoading, updateUserData, history, location, optional } = this.props;

    // Are we returning from auth provider?
    const urlParams = queryString.parse(window.location.search);
    if (urlParams.jwt) {
      // eslint-disable-next-line
      console.log('Welcome back from the auth provider! Let\'s look if we can get you authenticated...');

      getRawGraph(`query{panel(token:"${urlParams.jwt}"){${userGraphString}}}`).then(data => {
        if (data.data.panel == null) {
          window.location.href = window.env.AUTH_URL;
        } else {
          authenticate(urlParams.jwt);
          updateUserData(data.data.panel.user);

          // store it in local storage
          storage('jwt', { token: urlParams.jwt, since: new Date().getTime() });

          const originalUrl = storage('originalUrl');
          if (typeof originalUrl === 'undefined' || originalUrl === null) {
            history.push('/');
          } else {
            history.push(originalUrl);
          }
        }
      });
      return;
    }

    if (!isAuthenticated && !isLoading) {
      // We got this, we are working on it!
      updateIsLoading(true);

      // Check if we can take from storage
      const cacheData = storage('jwt');

      if (
        typeof cacheData === 'undefined' ||
        cacheData === null ||
        cacheData.since < new Date().getTime() - tokenExpiration
      ) {
        if (!optional) {
          storage('originalUrl', location.pathname);
          window.location.href = window.env.AUTH_URL;
        } else {
          updateIsLoading(false);
        }
        return;
      }

      getRawGraph(`query{panel(token:"${cacheData.token}"){${userGraphString}}}`).then(data => {
        if (data.data.panel == null) {
          if (!optional) {
            storage('originalUrl', location.pathname);
            window.location.href = window.env.AUTH_URL;
          } else {
            updateIsLoading(false);
          }
        } else {
          authenticate(cacheData.token);
          updateUserData(data.data.panel.user);
        }
      });
    }
  }

  render() {
    const { isAuthenticated, children } = this.props;

    window.testLocal = () => {
      window.location.href = `http://localhost:3000/callback?jwt=${this.props.jwt}`;
    };

    if (isAuthenticated && children) {
      return children;
    }
    return null;
  }
}

RequireAuth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  jwt: PropTypes.string,
  authenticate: PropTypes.func.isRequired,
  graph: PropTypes.func.isRequired,
  updateIsLoading: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  optional: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.isAuthenticated(state),
  isLoading: authSelectors.isLoading(state),
  jwt: authSelectors.getJwt(state)
});

const mapDispatchToProps = dispatch => ({
  authenticate: jwt => dispatch(authOperations.authenticate(jwt)),
  updateIsLoading: loading => dispatch(authOperations.updateIsLoading(loading)),
  updateUserData: data => dispatch(authOperations.updateUserData(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequireAuth));
