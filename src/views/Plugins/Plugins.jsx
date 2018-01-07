import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Row, Col, Switch, Avatar, Pagination, Icon } from 'antd';
import './_style.css';

import { pluginsSelectors, pluginsOperations } from '../../state/plugins';

class Plugins extends Component {
  componentDidMount() {
    const { verifyData } = this.props;
    verifyData();
  }

  render() {
    const { plugins } = this.props;

    const renderedPlugins = plugins.map(plugin => (
      <Col span={12} key={plugin.name} className="pluginCard">
        <Card
          key={plugin.name}
          title={plugin.name}
          extra={
            <Switch
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="cross" />}
              defaultChecked
            />
          }
        >
          <Col span={2} className="pluginCardImage">
            <Avatar shape="square" size="large" icon="api" />
          </Col>
          <Col span={10}>
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
          </Col>
          <Col span={12}>
            <div>{plugin.description}</div>
          </Col>
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
        <Row gutter={24} type="flex" justify="center">
          <Pagination defaultCurrent={6} total={500} />
        </Row>
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
