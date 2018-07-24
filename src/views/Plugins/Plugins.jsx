import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-grid-system';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import './_style.css';

import { pluginsSelectors, pluginsOperations } from '../../state/plugins';

class Plugins extends Component {
  componentDidMount() {
    const { verifyData } = this.props;
    verifyData();
  }

  render() {
    const { plugins, installPlugin, uninstallPlugin } = this.props;

    const renderedPlugins = plugins.map(plugin => (
      <Col sm={4}>
        <Card className="pluginCard">
          <CardHeader
            avatar=""
            title={plugin.name}
            subtitle={plugin.author}
            actAsExpander
            showExpandableButton
          />
          <Divider />
          <CardText>
            {plugin.isInstalled && (
              <div>
                <RaisedButton
                  backgroundColor="#c14b4b"
                  labelColor="#fff"
                  label="Uninstall"
                  disabled={plugin.actionInProgress}
                  fullWidth
                  onClick={() => uninstallPlugin(plugin.name)}
                >
                  {plugin.actionInProgress && (
                    <CircularProgress
                      style={{
                        color: '#00aeae',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: -12,
                        marginLeft: -12
                      }}
                      size={24}
                    />
                  )}
                </RaisedButton>
              </div>
            )}
            {!plugin.isInstalled && (
              <div>
                <RaisedButton
                  backgroundColor="#00aeae"
                  labelColor="#fff"
                  label="Install"
                  disabled={plugin.actionInProgress}
                  fullWidth
                  onClick={() => installPlugin(plugin.name)}
                >
                  {plugin.actionInProgress && (
                    <CircularProgress
                      style={{
                        color: '#00aeae',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: -12,
                        marginLeft: -12
                      }}
                      size={24}
                    />
                  )}
                </RaisedButton>
              </div>
            )}
          </CardText>
          <CardText expandable>
            <p>
              <b>Version {plugin.version}</b>
            </p>
            {plugin.description}
            <p>
              <b>Commands</b>
            </p>
            {plugin.commands.join(', ')}
          </CardText>
        </Card>
      </Col>

      /*
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
      */
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
        <Paper className="pageContainer">
          <Row>
            <Col sm={12}>
              <h4 className="pageContainerTitle">Was sind Plugins?</h4>
              <small>
                Plugins sind Erweiterungen für Twasi.<br />
                Du bestimmst, welche Plugins du für deinen Persönlichen Bot
                installieren bzw. deinstallieren möchtest.
              </small>
            </Col>
          </Row>
          <br />
          <Divider />
          <br />
          <Row>{renderedPlugins}</Row>
        </Paper>
      </div>
    );
  }
}

Plugins.propTypes = {
  plugins: PropTypes.arrayOf(PropTypes.shape({})),
  verifyData: PropTypes.func.isRequired,
  installPlugin: PropTypes.func.isRequired,
  uninstallPlugin: PropTypes.func.isRequired
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
