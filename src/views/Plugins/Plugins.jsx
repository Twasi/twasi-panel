import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Card, Row, Col } from 'antd';

import { pluginsSelectors, pluginsOperations } from '../../state/plugins';

class Plugins extends Component {
  componentDidMount() {
    const { verifyData } = this.props;
    verifyData();
  }

  render() {
    const { plugins } = this.props;

    const renderedPlugins = plugins.map(plugin => (
      <Col span={6} style={{ marginTop: 16 }} key={plugin.name}>
        <Card key={plugin.name} title={plugin.name}>
          <table>
            <tbody>
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
            </tbody>
          </table>
          <br />
          <div>{plugin.description}</div>
        </Card>
      </Col>
    ));

    return (
      <div>
        <h2>
          <FormattedMessage id="sidebar.plugins" />
        </h2>
        <Row gutter={16}>{renderedPlugins}</Row>
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
