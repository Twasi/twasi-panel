import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'antd';

class Plugins extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plugins: {
        plugins: [],
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
      .plugins.get()
      .then(data =>
        this.setState({ plugins: { plugins: data.plugins, isLoaded: true } })
      );
  }

  render() {
    const { plugins } = this.state.plugins;

    const renderedPlugins = plugins.map(plugin => (
      <Col span={6} style={{ marginTop: 16 }}>
        <Card key={plugin.name} title={plugin.name}>
          <table>
            <tr>
              <td>Name: </td>
              <td>{plugin.name}</td>
            </tr>
            <tr>
              <td>Author: </td>
              <td>{plugin.author}</td>
            </tr>
            <tr>
              <td>Version: </td>
              <td>{plugin.version}</td>
            </tr>
          </table>
          <br />
          <div>{plugin.description}</div>
        </Card>
      </Col>
    ));

    return (
      <div>
        <h2>Plugins</h2>
        <Row gutter={16}>{renderedPlugins}</Row>
      </div>
    );
  }
}

Plugins.propTypes = {
  services: PropTypes.func.isRequired
};

export default Plugins;
