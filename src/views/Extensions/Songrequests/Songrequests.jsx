import React from 'react';
import { Card, Table, Button, Icon, Col, Row } from 'antd';

class Songrequests extends React.Component {
  render() {
    return (
      <div>
        <Row gutter={24} type="flex">
          <Col span={12}>
            <Card>
              <h2>Player</h2>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <h2>Warteschlange</h2>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Songrequests;
