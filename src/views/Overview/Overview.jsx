import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Icon, Row, Col, Card, Tag, Divider, List } from 'antd';

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
        <Tag color="#87d068">
          <FormattedMessage id="status.started" defaultMessage="Started" />
        </Tag>
      </span>
    );
    const stopped = (
      <span style={{ color: 'red' }}>
        <Tag color="#f5222d">
          <FormattedMessage id="status.stopped" defaultMessage="Stopped" />
        </Tag>
      </span>
    );

    return (
      <div>
        <Row gutter={24}>
          <Col span={6}>
            <Card
              actions={[
                <Icon onClick={() => history.push('/status')} type="setting">
                  {' '}
                  <FormattedMessage
                    id="status.manage"
                    defaultMessage="Manage"
                  />{' '}
                </Icon>
              ]}
            >
              <Row gutter={16} type="flex" justify="center">
                <Col align="middle" span={24}>
                  <h2>Twitchbot</h2>
                  <Divider className="dividerStatus">
                    {' '}
                    {status.isRunning && running}
                    {!status.isRunning && stopped}
                  </Divider>
                </Col>
              </Row>
            </Card>
            <Card style={{ marginTop: '10px' }}>
              <Divider>Log</Divider>
              <List
                size="small"
                dataSource={databot}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </Card>
          </Col>

          <Col span={6}>
            <Card
              actions={[
                <Icon onClick={() => history.push('/settings')} type="setting">
                  {' '}
                  <FormattedMessage
                    id="status.manage"
                    defaultMessage="Manage"
                  />{' '}
                </Icon>
              ]}
            >
              <Row gutter={16} type="flex" justify="center">
                <Col align="middle" span={24}>
                  <h2>Songrequests</h2>
                  <Divider className="dividerStatus">
                    <Tag color="#87d068">aktiviert</Tag>
                  </Divider>
                </Col>
              </Row>
            </Card>
            <Card style={{ marginTop: '10px' }}>
              <Divider>Letzte Requests</Divider>
              <List
                size="small"
                dataSource={data}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </Card>
          </Col>

          <Col span={6}>
            <Card
              actions={[
                <Icon onClick={() => history.push('/settings')} type="setting">
                  {' '}
                  <FormattedMessage
                    id="status.manage"
                    defaultMessage="Manage"
                  />{' '}
                </Icon>
              ]}
            >
              <Row gutter={16} type="flex" justify="center">
                <Col align="middle" span={24}>
                  <h2>Timeouts</h2>
                  <Divider className="dividerStatus">
                    <Tag color="#87d068">aktiviert</Tag>
                  </Divider>
                </Col>
              </Row>
            </Card>
            <Card style={{ marginTop: '10px' }}>
              <Divider>Letzte Timeouts</Divider>
              <List
                size="small"
                dataSource={data}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </Card>
          </Col>

          <Col span={6}>
            <Card
              actions={[
                <Icon onClick={() => history.push('/settings')} type="setting">
                  {' '}
                  <FormattedMessage
                    id="status.manage"
                    defaultMessage="Manage"
                  />{' '}
                </Icon>
              ]}
            >
              <Row gutter={16} type="flex" justify="center">
                <Col align="middle" span={24}>
                  <h2>Tokens</h2>
                  <Divider className="dividerStatus">
                    <Tag color="#87d068">aktiviert</Tag>
                  </Divider>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
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
