import React from 'react';
import PropTypes from 'prop-types';

import serviceFactory from '../../services/serviceFactory';

const withService = WrappedComponent => {
  const WithServiceComponent = (props, context) => {
    const { jwt } = context;

    return <WrappedComponent {...props} services={serviceFactory(jwt)} />;
  };

  WithServiceComponent.contextTypes = {
    jwt: PropTypes.string
  };

  return WithServiceComponent;
};

export default withService;
