import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
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
      <Grid container spacing={0} style={{ marginTop: '23px' }}>
        <Grid item xs={12}>
          <Card className="pluginCard">
            <CardContent className="pluginCardContent">
              <Grid container spacing={0} style={{ marginTop: '0px' }}>
                <Grid item xs={4}>
                  <h3 className="pageContainerTitle">{plugin.name}</h3>
                  <br />
                  <small>
                    by <i>{plugin.author}</i><br />
                    <FormattedMessage id="plugins.version" /> {plugin.version}
                  </small>
                </Grid>
                <Grid item xs={8}>
                  <h4 className="pageContainerTitle">Plugin Description</h4>
                  <small>
                    {plugin.description}
                  </small>
                </Grid>
              </Grid>
              <Divider style={{ marginTop: '15px', marginBottom: '15px' }} />
              <Grid container spacing={0}>
                <Grid item xs={4}>
                  {plugin.isInstalled && (
                    <div>
                      <Button
                        variant="contained"
                        color="secondary"
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
                        variant="contained"
                        color="primary"
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
                </Grid>
                <Grid item xs={4}>
                  <b>
                    <FormattedMessage id="plugins.commands" />
                  </b><br />
                  <small>{plugin.commands.join(', ')}</small>
                </Grid>
                <Grid item xs={4}>
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
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" href="/">
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.plugins" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <h4 className="pageContainerTitle">
                <FormattedMessage id="plugins.card_headline" />
              </h4>
              <small>
                <FormattedMessage id="plugins.explanation" />
              </small>
            </Grid>
          </Grid>
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
