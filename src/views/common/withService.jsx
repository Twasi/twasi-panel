import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { authSelectors } from '../../state/auth';
import serviceFactory from '../../services/serviceFactory';

const withService = WrappedComponent => {
  const WithServiceComponent = props => {
    const { jwt } = props;

    return <WrappedComponent {...props} services={serviceFactory(jwt)} />;
  };

  WithServiceComponent.propTypes = {
    jwt: PropTypes.string
  };

  const mapStateToProps = state => ({
    jwt: authSelectors.getJwt(state)
  });

  return connect(mapStateToProps)(WithServiceComponent);
};

export default withService;
