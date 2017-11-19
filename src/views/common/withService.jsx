import React from 'react';
import PropTypes from 'prop-types';

const withService = (WrappedComponent, service) => {
  const WithServiceComponent = (props, context) => {
    const { jwt } = context;

    return <WrappedComponent {...props} service={service(jwt)} />;
  };

  WithServiceComponent.contextTypes = {
    jwt: PropTypes.string
  };

  return WithServiceComponent;
};

export default withService;
