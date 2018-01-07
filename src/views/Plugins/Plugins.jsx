import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Row, Col, Switch } from 'antd';

import { pluginsSelectors, pluginsOperations } from '../../state/plugins';

class Plugins extends Component {
  componentDidMount() {
    const { verifyData } = this.props;
    verifyData();
  }

  render() {
    const { plugins } = this.props;

    const renderedPlugins = plugins.map(plugin => (
      <Col span={6} key={plugin.name}>
        <Card
          key={plugin.name}
          title={plugin.name}
          extra={<Switch defaultChecked />}
        >
          <table>
            <tbody>
              <tr>
                <td>
                  <b>Name:</b>{' '}
                </td>
                <td>{plugin.name}</td>
              </tr>
              <tr>
                <td>
                  <b>Author:</b>{' '}
                </td>
                <td>{plugin.author}</td>
              </tr>
              <tr>
                <td>
                  <b>Version:</b>{' '}
                </td>
                <td>{plugin.version}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <div>{plugin.description}</div>
        </Card>
      </Col>
    ));

    return (
      <div>
        <Row>
          <Col span={24}>
            <Card title="Willkommen im Pluginstore">
              Hier findest du sämtliche Plugins, die den Funktionsumfang des
              Bots erweitern.<br />
              Es gibt Standard Plugins und von Entwicklern veröffentlichte
              Plugins, die du zusätzlich installieren bzw. deinstallieren
              kannst.<br />
              <br />
              Erfahre, wie du selber Erweiterungen für Twasi entwickeln und
              veröffentlichen kannst LINK
            </Card>
          </Col>
        </Row>
        <br />
        <Row gutter={24}>{renderedPlugins}</Row>
      </div>
    );
  }
}

Plugins.propTypes = {
  plugins: PropTypes.arrayOf(PropTypes.shape({})),
  verifyData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  plugins: pluginsSelectors.getPlugins(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(pluginsOperations.verifyData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Plugins);
