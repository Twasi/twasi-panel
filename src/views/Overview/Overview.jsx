import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Row, Col, Card, Button } from 'antd';

import { statusSelectors, statusOperations } from '../../state/status';

class Overview extends Component {
  componentWillMount() {
    const { verifyData } = this.props;
    verifyData();
  }

  render() {
    const { history, status } = this.props;

    const running = (
      <span style={{ color: 'green' }}>
        <Icon type="check-circle-o" /> Running
      </span>
    );
    const stopped = (
      <span style={{ color: 'red' }}>
        <Icon type="close-circle-o" /> Stopped
      </span>
    );

    return (
      <div>
        <h2>Main</h2>
        <Card
          title="Bot status"
          extra={
            <Button onClick={() => history.push('/status')}>Manage</Button>
          }
          style={{ width: 300 }}
        >
          <Row type="flex" justify="center">
            <Col span={12}>Twitchbot</Col>
            <Col span={12}>
              {status.isRunning && running}
              {!status.isRunning && stopped}
            </Col>
          </Row>
        </Card>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Overview)
);
