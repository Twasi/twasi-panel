import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Icon, Row, Col, Card, Button } from 'antd';

import { statusSelectors, statusOperations } from '../../state/status';

class StatusInfo extends Component {
  componentDidMount() {
    const { verifyData } = this.props;
    verifyData();
  }

  render() {
    const { status, startBot, stopBot, isStarting, isStopping } = this.props;

    const running = (
      <span style={{ color: 'green' }}>
        <Icon type="check-circle-o" /> <FormattedMessage id="status.started" />
      </span>
    );
    const stopped = (
      <span style={{ color: 'red' }}>
        <Icon type="close-circle-o" /> <FormattedMessage id="status.stopped" />
      </span>
    );

    return (
      <Card title="Bot status">
        <Row type="flex" justify="center">
          <Col span={12}>Twitchbot</Col>
          <Col span={12}>
            {status.isRunning && running}
            {!status.isRunning && stopped}
          </Col>
        </Row>
        <Row>
          <Button
            type="danger"
            disabled={!status.isRunning}
            onClick={stopBot}
            loading={isStopping}
          >
            Stop
          </Button>
          <Button
            type="success"
            disabled={status.isRunning}
            onClick={startBot}
            loading={isStarting}
          >
            Start
          </Button>
        </Row>
      </Card>
    );
  }
}

StatusInfo.propTypes = {
  verifyData: PropTypes.func.isRequired,
  status: PropTypes.shape({}),
  startBot: PropTypes.func.isRequired,
  stopBot: PropTypes.func.isRequired,
  isStarting: PropTypes.bool.isRequired,
  isStopping: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  status: statusSelectors.getStatus(state),
  isStarting: statusSelectors.isStarting(state),
  isStopping: statusSelectors.isStopping(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(statusOperations.verifyData()),
  stopBot: () => dispatch(statusOperations.stopBot()),
  startBot: () => dispatch(statusOperations.startBot())
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusInfo);
