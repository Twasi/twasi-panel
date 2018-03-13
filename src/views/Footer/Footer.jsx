import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { appInfoSelectors, appInfoOperations } from '../../state/appInfo';

const pkgJson = require('../../../package.json');

const Footer = ({ serverVersion, verifyData }) => {
  verifyData();
  return (
    <div style={{ textAlign: 'center', color: '#a2a2a2' }}>
      Twasi ©2016 - {new Date().getFullYear()}, MPL-2.0 | Twasi-panel v.{
        pkgJson.version
      }{' '}
      - #{window.env.BUILD_DESC} | Twasi-core v.{serverVersion}
    </div>
  );
};

Footer.propTypes = {
  serverVersion: PropTypes.string,
  verifyData: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(appInfoOperations.verifyData())
});

const mapStateToProps = state => ({
  serverVersion: appInfoSelectors.getVersion(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
