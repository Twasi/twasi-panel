import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Row, Col, Card } from 'antd';

import withService from '../common/withService';

class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: {
        isRunning: false,
        isLoaded: false
      }
    };

    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const { services } = this.props;
    services()
      .bot.info()
      .then(data => this.setState({ status: { ...data, isLoaded: true } }));
  }

  render() {
    const { status } = this.state;

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
        <h2>Status</h2>
        <Card title="Bot status" style={{ width: 300 }}>
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

Status.propTypes = {
  services: PropTypes.func.isRequired
};

export default withService(Status);
