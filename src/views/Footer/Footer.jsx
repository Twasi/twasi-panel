import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import { appInfoSelectors, appInfoOperations } from '../../state/appInfo';

const AntdFooter = Layout.Footer;

const pkgJson = require('../../../package.json');

const Footer = ({ serverVersion, verifyData }) => {
  verifyData();
  return (
    <AntdFooter style={{ textAlign: 'center' }}>
      Twasi ©2017 MPL-2.0 | Twasi-panel v.{pkgJson.version} - #{
        window.env.BUILD_DESC
      }{' '}
      | Twasi-core v.{serverVersion}
    </AntdFooter>
  );
};

Footer.propTypes = {
  serverVersion: PropTypes.string,
  verifyData: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(appInfoOperations.verifyData())
});

const mapStateToProps = state => ({
  serverVersion: appInfoSelectors.getVersion(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
