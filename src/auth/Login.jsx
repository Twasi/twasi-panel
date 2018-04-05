import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Redirect, withRouter } from 'react-router-dom';
import storage from 'local-storage';

import withService from '../views/common/withService';
import { authSelectors, authOperations } from '../state/auth';

// 2 Hours
const tokenExpiration = 2 * 60 * 60 * 1000;

class Login extends React.Component {
  componentWillMount() {
    const { isAuthenticated, authenticate, graph, updateUserData } = this.props;

    if (isAuthenticated) {
      return;
    }

    const urlParams = queryString.parse(window.location.search);

    if (urlParams.jwt) {
      authenticate(urlParams.jwt);
      storage('jwt', { token: urlParams.jwt, since: new Date().getTime() });
      graph('user{id,twitchAccount{twitchid,name,avatar,email}}', urlParams.jwt).then(data => {
        if (data.data.viewer == null) {
          window.location.href = window.env.AUTH_URL;
        } else {
          updateUserData(data.data.viewer.user);
        }
      });
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
      graph('user{id,twitchAccount{twitchid,name,avatar,email}}', cacheData.token).then(data => {
        if (data.data.viewer == null) {
          window.location.href = window.env.AUTH_URL;
        } else {
          updateUserData(data.data.viewer.user);
        }
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
  graph: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.isAuthenticated(state)
});

const mapDispatchToProps = dispatch => ({
  authenticate: jwt => dispatch(authOperations.authenticate(jwt)),
  updateUserData: data => dispatch(authOperations.updateUserData(data))
});

export default withService(withRouter(connect(mapStateToProps, mapDispatchToProps)(Login)));
