import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-grid-system';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
            <Card className="pluginCard" style={{ minHeight: '183px' }}>
              <CardContent className="pluginCardContent">
                  <b>{plugin.name}</b><br />
                  by <i>{plugin.author}</i><br />
                  <FormattedMessage id="plugins.version" /> {plugin.version}
              </CardContent>
              <Divider />
              <CardContent className="pluginCardContent">
                {plugin.isInstalled && (
                  <div>
                    <Button
                      fullWidth
                      variant="contained" color="secondary"
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
                      fullWidth
                      variant="contained" color="primary"
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
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card className="pluginCard" style={{ minHeight: '183px' }}>
              <CardContent className="pluginCardContent">
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
              </CardContent>
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
          {renderedPlugins}
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
