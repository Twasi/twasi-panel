import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Row, Col, Card, Button } from 'antd';

class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: {
        isRunning: false,
        isLoaded: false
      }
    };

    this.intervalId = null;

    this.loadData = this.loadData.bind(this);
    this.startBot = this.startBot.bind(this);
    this.stopBot = this.stopBot.bind(this);
  }

  componentDidMount() {
    this.loadData();
    this.intervalId = setInterval(this.loadData, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  loadData() {
    const { services } = this.props;
    services()
      .bot.info()
      .then(data => this.setState({ status: { ...data, isLoaded: true } }));
  }

  stopBot() {
    const { services } = this.props;

    services()
      .bot.stop()
      .then(() => {
        this.loadData();
      });
  }

  startBot() {
    const { services } = this.props;

    services()
      .bot.start()
      .then(() => {
        this.loadData();
      });
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
            onClick={this.stopBot}
          >
            Stop
          </Button>
          <Button
            type="success"
            disabled={status.isRunning}
            onClick={this.startBot}
          >
            Start
          </Button>
        </Row>
      </Card>
    );
  }
}

Status.propTypes = {
  services: PropTypes.func.isRequired
};

export default Status;
