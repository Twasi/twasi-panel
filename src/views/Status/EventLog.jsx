import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Row, Col, Card, Table } from 'antd';

import withService from '../common/withService';

class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
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
      .user.events()
      .then(data => this.setState({ data: { ...data, isLoaded: true } }));
  }

  render() {
    const { data } = this.state;
    console.log(data);

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
      <Card title="Event Log">
        {data.messages && (
          <Table
            columns={[
              {
                title: 'Name',
                dataIndex: 'message'
              },
              {
                title: 'Timestamp',
                dataIndex: 'createdAt'
              }
            ]}
            dataSource={data.messages.map(message => ({ ...message, key: message.createdAt }))}
          />
        )}
      </Card>
    );
  }
}

Status.propTypes = {
  services: PropTypes.func.isRequired
};

export default withService(Status);
