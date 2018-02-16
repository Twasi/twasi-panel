import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './_style.css';

import { pluginsSelectors, pluginsOperations } from '../../state/plugins';

class Plugins extends Component {
  state = {
    value: 3
  };

  componentDidMount() {
    const { verifyData } = this.props;
    verifyData();
  }
  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const { plugins, installPlugin, uninstallPlugin, isLoading, updateQuery } = this.props;
    const { value } = this.state;

    const renderedPlugins = plugins.map(plugin => (
      <div span={12} key={plugin.name} className="pluginCard">
        <div
          key={plugin.name}
          title={plugin.name}
          extra={
            <input
              checkedChildren={<icon type="check" />}
              unCheckedChildren={<icon type="cross" />}
              checked={plugin.isInstalled}
              onChange={checked => {
                if (checked) {
                  installPlugin(plugin.name);
                } else {
                  uninstallPlugin(plugin.name);
                }
              }}
            />
          }>
          <div span={2} className="pluginCardImage">
            <img shape="square" size="large" icon="api" alt="Plugin" />
          </div>
          <div span={10}>
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
          </div>
          <div span={12}>
            <div>{plugin.description}</div>
          </div>
          <div span={24}>
            <div />
            <div span={12}>
              <span>
                <div onChange={this.handleChange} value={value} style={{ color: '#00AEAE' }} />
                <span className="ant-rate-text">1337 Bewertungen</span>
              </span>
            </div>
            <div span={12}>
              <button className="feedbackbutton" type="primary">
                Feedback geben
              </button>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <div>
          <div span={24}>
            <div
              title="Willkommen im Pluginstore"
              extra={
                <input
                  placeholder="Suche nach einem Plugin"
                  style={{ width: 200 }}
                  onChange={e => updateQuery(e.target.value)}
                />
              }>
              Hier findest du sämtliche Plugins, die den Funktionsumfang des Bots erweitern.<br />
              Es gibt Standard Plugins und von Entwicklern veröffentlichte Plugins, die du
              zusätzlich installieren bzw. deinstallieren kannst.<br />
              <br />
              Erfahre, wie du selber Erweiterungen für Twasi entwickeln und veröffentlichen kannst
              LINK
            </div>
          </div>
        </div>
        <br />
        {!isLoading && <div gutter={24}>{renderedPlugins}</div>}
        {isLoading && (
          <div style={{ width: '100%' }}>
            <div
              indicator={
                <icon
                  type="loading"
                  style={{ fontSize: 24, textAlign: 'center', width: '100%' }}
                  spin
                />
              }
            />
          </div>
        )}
      </div>
    );
  }
}

Plugins.propTypes = {
  plugins: PropTypes.arrayOf(PropTypes.shape({})),
  verifyData: PropTypes.func.isRequired,
  installPlugin: PropTypes.func.isRequired,
  uninstallPlugin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  updateQuery: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  plugins: pluginsSelectors.getPlugins(state),
  isLoading: pluginsSelectors.isLoading(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(pluginsOperations.verifyData()),
  installPlugin: name => dispatch(pluginsOperations.installPlugin(name)),
  uninstallPlugin: name => dispatch(pluginsOperations.uninstallPlugin(name)),
  updateQuery: query => dispatch(pluginsOperations.updateQuery(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Plugins);
