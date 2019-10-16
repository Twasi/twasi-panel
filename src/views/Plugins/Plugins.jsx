import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import './_style.css';

import { pluginsSelectors, pluginsOperations } from '../../state/plugins';

import StickerDesign from '../common/resources/sticker_design.png';

class Plugins extends Component {
  componentDidMount() {
    const { verifyData } = this.props;
    verifyData();
  }

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  handleClose = () => {
    this.setState({ modalOpen: false });
  }

  render() {
    const { plugins, installPlugin, uninstallPlugin, updatePlugins, isActionSuccess } = this.props;
    if (isActionSuccess) {
      updatePlugins()
    }
    const renderedPluginsNew = plugins.map(plugin => (
      <Grid item key={plugin.name} sm={6} md={4}>
        <Card className="pluginCard" style={{ borderRadius: "15px" }}>
          <CardMedia
            component="img"
            alt="Plugin Banner"
            height="115"
            image={plugin.banner !== null ? plugin.banner : StickerDesign}
            title="Plugin Banner"
          />
          <CardContent className="pluginCardContent" style={{ padding: '16px', borderRadius: '0px' }}>
            <div style={{ height: "200px" }}>
              <Typography component={'div'}>
                <h2 style={{ margin: "0px" }}>
                  {plugin.name}
                </h2>
                <h5 style={{ marginTop: "0px", marginBottom: "15px" }}>
                  <small>
                    <FormattedMessage id="plugins.by" />
                  </small> {plugin.author}
                </h5>
                <Divider />
                <br />
                <div style={{ position: "relative", bottom: "0" }}>
                  <h4 style={{ margin: "0px" }}>
                    <FormattedMessage id="plugins.short_description" />
                  </h4>
                  <small>
                    {plugin.description}
                  </small>
                  <br />
                </div>
              </Typography>
            </div>
            <Typography component={'div'}>
              <h4 style={{ margin: "0px" }}>
                <FormattedMessage id="plugins.commands" />
              </h4>
              <small>
                {plugin.commands.join(', ')}
              </small>
            </Typography>
            <br />
            <Divider />
            <br />
            <Grid container spacing={0}>
              <Grid item style={{ textAlign: "center" }} xs={6}>
                <Typography component={'div'}>
                  <h4 style={{ margin: "0px" }}>{plugin.version}</h4>
                  <small><FormattedMessage id="plugins.version" /></small>
                </Typography>
              </Grid>
              <Grid style={{ textAlign: "center" }} item xs={6}>
                <Typography component={'div'}>
                  <h4 style={{ margin: "0px" }}>{plugin.installations}</h4>
                  <small><FormattedMessage id="plugins.installations" /></small>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions style={{ padding: "0px" }}>
          {plugin.isInstalled && (
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              style={{ borderRadius: "0px" }}
              disabled={plugin.actionInProgress}
              onClick={() => uninstallPlugin(plugin.id)}
            >
              <FormattedMessage id="plugins.uninstall" />
              {plugin.actionInProgress && (
                <CircularProgress
                  color="primary"
                  style={{
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
          )}
          {!plugin.isInstalled && (
            <Button
              variant="contained"
              color="primary"
              style={{ borderRadius: "0px" }}
              fullWidth
              disabled={plugin.actionInProgress}
              onClick={() => installPlugin(plugin.id)}
            >
              <FormattedMessage id="plugins.install" />
              {plugin.actionInProgress && (
                <CircularProgress
                  color="primary"
                  style={{
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
          )}
          </CardActions>
        </Card>
      </Grid>
    ));

    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.plugins" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography component={'div'}>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="plugins.card_headline" />
                  <span style={{ float: 'right' }}>
                    <Button variant="contained" color="primary" style={{ marginRight: 16 }} onClick={() => {this.props.updatePlugins()}}>
                      <Icon style={{ marginRight: '5px' }}>cached</Icon>
                      <FormattedMessage id="common.refresh" />
                    </Button>
                  </span>
                </h4>
                <small>
                  <FormattedMessage id="plugins.explanation" />
                </small>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ marginTop: '23px' }} className="anim">
            {renderedPluginsNew}
          </Grid>
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
  isLoading: pluginsSelectors.isLoading(state),
  isActionSuccess: pluginsSelectors.isActionSuccess(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(pluginsOperations.verifyData()),
  installPlugin: name => dispatch(pluginsOperations.installPlugin(name)),
  uninstallPlugin: name => dispatch(pluginsOperations.uninstallPlugin(name)),
  updateQuery: query => dispatch(pluginsOperations.updateQuery(query)),
  updatePlugins: () => dispatch(pluginsOperations.loadData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Plugins);
