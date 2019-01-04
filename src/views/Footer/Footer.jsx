import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { appInfoSelectors, appInfoOperations } from '../../state/appInfo';

const pkgJson = require('../../../package.json');

class Footer extends Component {
  componentDidMount() {
    const { loadVersion } = this.props;
    loadVersion();
  }

  render() {
    const { serverVersion } = this.props;
    return (
      <div style={{ textAlign: 'center', color: '#a2a2a2', marginBottom: '20px' }}>
        Twasi ©2016 - {new Date().getFullYear()}, MPL-2.0 | Twasi-Panel v.{
          pkgJson.version
        }{' '}
        - #{window.env.BUILD_DESC} | Twasi-Core v.{serverVersion}
      </div>
    );
  }
}

Footer.propTypes = {
  serverVersion: PropTypes.string,
  loadVersion: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  loadVersion: () => setTimeout(() => dispatch(appInfoOperations.loadVersion(), 1000))
});

const mapStateToProps = state => ({
  serverVersion: appInfoSelectors.getVersion(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
