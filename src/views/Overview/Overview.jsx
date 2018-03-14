import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Paper from 'material-ui/Paper';
import { Container, Row, Col } from 'react-grid-system';

import { statusSelectors, statusOperations } from '../../state/status';
import './_style.css';

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
      <div className="pageContent">
        <Container className="overviewHead">
          <Row>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  <h2 style={{ margin: '7px 0px 0px' }}>
                    <span>1337</span>
                  </h2>
                  <small>Follower</small>
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  <h2 style={{ margin: '7px 0px 0px' }}>
                    <span>1337</span>
                  </h2>
                  <small>Zuschauer getrackt</small>
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  <h2 style={{ margin: '7px 0px 0px' }}>
                    <span>1337</span>
                  </h2>
                  <small>Chatnachrichten getrackt</small>
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  <h2 style={{ margin: '7px 0px 0px' }}>
                    <span>1337</span>
                  </h2>
                  <small>Streams getrackt</small>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Paper className="pageContainer">
          <div
            title="Bot status"
            extra={
              <button onClick={() => history.push('/status')}>
                <FormattedMessage id="status.manage" defaultMessage="Manage" />
              </button>
            }
            style={{ width: 300 }}
          >
            <div type="flex" justify="center">
              <div span={12}>Twitchbot</div>
              <div span={12}>
                {status.isRunning && running}
                {!status.isRunning && stopped}
              </div>
            </div>
          </div>
        </Paper>
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
