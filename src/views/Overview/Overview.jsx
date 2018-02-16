import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { statusSelectors, statusOperations } from '../../state/status';
import './_style.css';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.'
];

const databot = [
  '13:37 - Bot gestartet',
  '13:38 - Bot gestoppt',
  '13:39 - Bot gestartet',
  '13:40 - Bot gestoppt',
  '13:41 - Bot gestartet'
];

class Overview extends Component {
  componentWillMount() {
    const { verifyData } = this.props;
    verifyData();
  }

  render() {
    const { history, status } = this.props;

    const running = (
      <span style={{ color: 'green' }}>
        <icon type="check-circle-o" />{' '}
        <FormattedMessage id="status.started" defaultMessage="Started" />
      </span>
    );
    const stopped = (
      <span style={{ color: 'red' }}>
        <icon type="close-circle-o" />{' '}
        <FormattedMessage id="status.stopped" defaultMessage="Stopped" />
      </span>
    );

    return (
      <div>
        <h2 className="pageTitle">
          <FormattedMessage id="sidebar.overview" />
        </h2>
        <div
          title="Bot status"
          extra={
            <button onClick={() => history.push('/status')}>
              <FormattedMessage id="status.manage" defaultMessage="Manage" />
            </button>
          }
          style={{ width: 300 }}>
          <div type="flex" justify="center">
            <div span={12}>Twitchbot</div>
            <div span={12}>
              {status.isRunning && running}
              {!status.isRunning && stopped}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Overview.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  verifyData: PropTypes.func.isRequired,
  status: PropTypes.shape({})
};

const mapStateToProps = state => ({
  status: statusSelectors.getStatus(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(statusOperations.verifyData())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Overview));
