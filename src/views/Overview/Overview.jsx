import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Icon, Row, Col, Card, Button } from 'antd';

import withService from '../common/withService';

class Main extends Component {
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
    const { history } = this.props;

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

Main.propTypes = {
  services: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(withService(Main));
