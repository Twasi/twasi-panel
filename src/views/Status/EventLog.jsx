import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'antd';

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
    this.intervalId = setInterval(this.loadData, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  loadData() {
    const { services } = this.props;
    services()
      .user.events()
      .then(data => this.setState({ data: { ...data, isLoaded: true } }));
  }

  render() {
    const { data } = this.state;

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
