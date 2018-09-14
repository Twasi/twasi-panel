import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { authSelectors } from '../../../state/auth';
import graphqlService from '../../../services/graphqlService';

const withService = Component => {
  const enhancedComponent = props => {
    const { jwt } = props;

    const executeQuery = (query, customToken) => graphqlService(`query{panel(token:"${customToken === null ? jwt : customToken}"){${query}}}`);

    return <Component {...props} graph={executeQuery} />;
  };

  enhancedComponent.displayName = `withService(${Component.displayName || Component.name})`;
  enhancedComponent.WrappedComponent = Component;

  enhancedComponent.propTypes = {
    jwt: PropTypes.string
  };

  const mapStateToProps = state => ({
    jwt: authSelectors.getJwt(state)
  });

  return connect(mapStateToProps)(enhancedComponent);
};

export default withService;
