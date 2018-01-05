import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Card, Button } from 'antd';

import { statusSelectors, statusOperations } from '../../state/status';

const ButtonGroup = Button.Group;

class StatusInfo extends Component {
  componentDidMount() {
    const { verifyData } = this.props;
    verifyData();
  }

  render() {
    const { status, startBot, stopBot, isStarting, isStopping } = this.props;
    return (
      <div>
        <Row gutter={24}>
          <Col span={6} key="status">
            <Card title="Twitchbot">
              <Row type="flex" justify="center">
                <ButtonGroup>
                  <Button
                    type="danger"
                    disabled={!status.isRunning}
                    onClick={stopBot}
                    loading={isStopping}
                  >
                    Bot Stoppen
                  </Button>
                  <Button
                    type="primary"
                    disabled={status.isRunning}
                    onClick={startBot}
                    loading={isStarting}
                  >
                    Bot Starten
                  </Button>
                </ButtonGroup>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
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
