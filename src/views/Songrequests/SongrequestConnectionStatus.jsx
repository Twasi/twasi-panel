import React from 'react';
import PropTypes from 'prop-types';

const SongrequestConnectionStatus = props => (
  <div className="SongrequestConnectionStatus">
    {props.status === 'connected' ? `Verbunden | ${props.timestamp}` : 'Getrennt'}
  </div>
);

SongrequestConnectionStatus.propTypes = {
  status: PropTypes.string,
};

export default SongrequestConnectionStatus;
