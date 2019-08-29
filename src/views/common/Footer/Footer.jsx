import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { appInfoSelectors, appInfoOperations } from '../../../state/appInfo';

const pkgJson = require('../../../../package.json');

class Footer extends Component {
  render() {
    const { serverVersion } = this.props;
    return (
      <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px' }}>
        <Typography>
          Twasi ©2016 - {new Date().getFullYear()}, MPL-2.0 | Twasi-Panel #{window.env.BUILD_DESC} | Twasi-Core #{serverVersion}
        </Typography>
        <br />
        <Typography>
          <RouterLink style={{ marginRight: '10px', paddingRight: '10px', borderRight: '1px solid rgba(175, 182, 197, 0.25)' }} to="/tos">
            <FormattedMessage id="footer.tos" />
          </RouterLink>
          <RouterLink style={{ marginRight: '10px', paddingRight: '10px', borderRight: '1px solid rgba(175, 182, 197, 0.25)' }} to="/imprint">
            <FormattedMessage id="footer.imprint" />
          </RouterLink>
          <RouterLink style={{ marginRight: '10px', paddingRight: '10px', borderRight: '1px solid rgba(175, 182, 197, 0.25)' }} to="/privacy">
            <FormattedMessage id="footer.privacy" />
          </RouterLink>
          <RouterLink style={{ marginRight: '10px', paddingRight: '10px', borderRight: '1px solid rgba(175, 182, 197, 0.25)' }} to="/branding">
            <FormattedMessage id="footer.branding" />
          </RouterLink>
          <Link style={{ marginRight: '10px', paddingRight: '10px', borderRight: '1px solid rgba(175, 182, 197, 0.25)' }} href="https://twitter.com/twasinet">
            Twitter
          </Link>
          <Link href="https://github.com/twasi">
            GitHub
          </Link>
        </Typography>
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
