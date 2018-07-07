import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Container, Row, Col } from 'react-grid-system';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    const {
      plugins,
      installPlugin,
      uninstallPlugin,
      isLoading,
      updateQuery
    } = this.props;
    const { value } = this.state;

    const renderedPlugins = plugins.map(plugin => (
      <Col sm={6}>
        <Paper className="pageContainer">
          <h3>{plugin.name}</h3>
          <div>{plugin.description}</div>
          <div>Version: {plugin.version}</div>
          <div>
            Registered commands: {plugin.commands.map(s => `!${s}`).join(', ')}
          </div>
          <div>Permissions: {plugin.commands.join(', ')}</div>
          {plugin.isInstalled && (
            <div>
              Installed<br />
              <Button onClick={() => uninstallPlugin(plugin.name)}>
                Uninstall
                {plugin.actionInProgress && <CircularProgress size={20} />}
              </Button>
            </div>
          )}
          {!plugin.isInstalled && (
            <div>
              Not installed<br />
              <Button onClick={() => installPlugin(plugin.name)}>
                Install
                {plugin.actionInProgress && <CircularProgress size={20} />}
              </Button>
            </div>
          )}
        </Paper>
      </Col>
      /*
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
          }
        >
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
                <div
                  onChange={this.handleChange}
                  value={value}
                  style={{ color: '#00AEAE' }}
                />
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
      */
    ));

    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="plugins.headline" />
        </h2>
        <Paper className="pageContainer">Plugins</Paper>
        {renderedPlugins}
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
