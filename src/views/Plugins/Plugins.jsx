import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-grid-system';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Tabs, Tab } from 'material-ui/Tabs';
import Grid from '@material-ui/core/Grid';
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
      <Grid container spacing={16} style={{ marginTop: '23px' }}>
          <Grid item xs={4}>
            <Card className="pluginCard" style={{ minHeight: '167px' }}>
              <CardHeader
                avatar=""
                title={<div><b>{plugin.name}</b></div>}
                subtitle={<div>by <i>{plugin.author}</i><br /><FormattedMessage id="plugins.version" /> {plugin.version}</div>}
              />
              <Divider />
              <CardText>
                {plugin.isInstalled && (
                  <div>
                    <Button
                      variant="outlined" color="secondary"
                      disabled={plugin.actionInProgress}
                      onClick={() => uninstallPlugin(plugin.name)}
                    >
                      Uninstall
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
                    </Button>
                  </div>
                )}
                {!plugin.isInstalled && (
                  <div>
                    <Button
                      variant="outlined" color="primary"
                      disabled={plugin.actionInProgress}
                      onClick={() => installPlugin(plugin.name)}
                    >
                      Install
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
                    </Button>
                  </div>
                )}
              </CardText>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card className="pluginCard" style={{ minHeight: '167px' }}>
              <CardText>
                {plugin.description}
                <Divider style={{ marginTop: '15px', marginBottom: '15px' }} />
                  <Grid container spacing={24}>
                    <Grid item xs={6}>
                      <b>
                        <FormattedMessage id="plugins.commands" />
                      </b><br />
                      <samp>{plugin.commands.join(', ')}</samp>
                    </Grid>
                    <Grid item xs={6}>
                      <b>
                        Dependencies
                      </b><br />
                      -
                    </Grid>
                  </Grid>
              </CardText>
            </Card>
          </Grid>
      </Grid>
    ));

    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="plugins.headline" />
        </h2>
        <Paper className="pageContainer">
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <h4 className="pageContainerTitle">
                <FormattedMessage id="plugins.card_headline" />
              </h4>
              <small>
                <FormattedMessage id="plugins.explanation" />
              </small>
            </Grid>
          </Grid>
          <br />
          <Tabs
            tabItemContainerStyle={{
              backgroundColor: '#fff'
            }}
            inkBarStyle={{ backgroundColor: '#00aeae' }}
            contentContainerStyle={{ paddingTop: '23px' }}
          >
            <Tab
              label={<FormattedMessage id="plugins.all" />}
              style={{ borderBottom: '2px solid #cacaca2b' }}
              buttonStyle={{
                color: '#000',
                paddingLeft: '23px',
                fontSize: '13px'
              }}
            >
              {renderedPlugins}
            </Tab>
            <Tab
              label={<FormattedMessage id="plugins.installed" />}
              style={{ borderBottom: '2px solid #cacaca2b' }}
              buttonStyle={{
                color: '#000',
                paddingLeft: '23px',
                fontSize: '13px'
              }}
            >
            </Tab>
            <Tab
              disabled
              label={<FormattedMessage id="plugins.free" />}
              style={{ borderBottom: '2px solid #cacaca2b' }}
              buttonStyle={{
                color: '#000',
                paddingLeft: '23px',
                fontSize: '13px'
              }}
            >
            </Tab>
            <Tab
              disabled
              label={<FormattedMessage id="plugins.paid" />}
              style={{ borderBottom: '2px solid #cacaca2b' }}
              buttonStyle={{
                color: '#000',
                paddingLeft: '23px',
                fontSize: '13px'
              }}
            >
            </Tab>
          </Tabs>
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
