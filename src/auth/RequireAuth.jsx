import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import storage from 'local-storage';

import { authSelectors, authOperations } from '../state/auth';
import { getRawGraph } from '../services/graphqlService';

// 2 Hours
const tokenExpiration = 2 * 60 * 60 * 1000;
const setupCheckString = 'isSetUp';

class RequireAuth extends React.Component {
  componentWillMount() {
    const { isAuthenticated, isLoading, authenticate, updateIsLoading, history, location, optional, updateSetup } = this.props;

    if (window.location.hash) {
      storage('betaKey', window.location.hash).substr(1);
    }

    const checkToken = jwt => new Promise((resolve, reject) => {
      getRawGraph(`query{setup(token:"${jwt}"){${setupCheckString}}}`).then(data => {
        if (data.data.setup == null) {
          if (!optional) {
            window.location.href = window.env.AUTH_URL;
            reject();
          } else {
            updateIsLoading(false);
            resolve();
          }
        } else {
          authenticate(jwt);
          updateSetup(data.data.setup.isSetUp);
          resolve();
        }
      });
    });

    // Are we returning from auth provider?
    const urlParams = queryString.parse(window.location.search);
    if (urlParams.jwt) {
      // eslint-disable-next-line
      console.log('Welcome back from the auth provider! Let\'s look if we can get you authenticated...');

      checkToken(urlParams.jwt).then(() => {
        storage('jwt', { token: urlParams.jwt, since: new Date().getTime() });

        const originalUrl = storage('originalUrl');
        if (typeof originalUrl === 'undefined' || originalUrl === null) {
          history.push('/');
        } else {
          history.push(originalUrl);
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

      checkToken(cacheData.token);
    }
  }

  render() {
    const { isAuthenticated, children, isSetUp, doNotRequireSetup } = this.props;

    let setUpCheck = isSetUp;

    if (doNotRequireSetup) {
      setUpCheck = true;
    }

    if (isAuthenticated && !setUpCheck) {
      return <Redirect to="/setup" />;
    }

    if (isAuthenticated && children && setUpCheck) {
      return children;
    }
    return null;
  }
}

RequireAuth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired,
  updateIsLoading: PropTypes.func.isRequired,
  updateSetup: PropTypes.func.isRequired,
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
  optional: PropTypes.bool,
  isSetUp: PropTypes.bool,
  doNotRequireSetup: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.isAuthenticated(state),
  isLoading: authSelectors.isLoading(state),
  isSetUp: authSelectors.isSetUp(state)
});

const mapDispatchToProps = dispatch => ({
  authenticate: jwt => dispatch(authOperations.authenticate(jwt)),
  updateIsLoading: loading => dispatch(authOperations.updateIsLoading(loading)),
  updateUserData: data => dispatch(authOperations.updateUserData(data)),
  updateSetup: isSetUp => dispatch(authOperations.updateIsSetUp(isSetUp))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequireAuth));
