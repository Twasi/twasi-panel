import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';

class Commands extends Component {
  render() {
    return (
      <div>
        <Row gutter={24}>
          <Col span={24}>
            <Card>Test</Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Commands;
