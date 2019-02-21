import React from 'react';
import PropTypes from 'prop-types';

const SongrequestConnectionStatus = props => (
  <div className="SongrequestConnectionStatus">
    {props.status === 'connected' ? `verbunden (${props.ping}ms)` : 'getrennt'}
  </div>
);

SongrequestConnectionStatus.propTypes = {
  status: PropTypes.string,
  ping: PropTypes.number
};

export default SongrequestConnectionStatus;
