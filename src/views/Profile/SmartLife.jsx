import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import './_style.css';

import smartlife_logo from '../common/resources/smartlife.png';

import { smartlifeSelectors, smartlifeOperations } from '../../state/integrations/smartlife';
import { authSelectors } from '../../state/auth';

class SmartLife extends Component {

  componentDidMount() {
    const { updateSmartlifeAuthUri, updateSmartlifeAccount } = this.props;
    updateSmartlifeAuthUri();
    updateSmartlifeAccount();
  }

  state = {
    openConnectSmartlifeAccount: false
  };

  handleClose = () => {
    this.setState({ openConnectSmartlifeAccount: false })
  };

  handleAuthentication = (uri) => {
    window.location = encodeURI(uri);
  }

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  render() {
    const { classes, onClose, smartlifeUri, smartlife, jwt, ...other } = this.props;
    return (
      <div className="pageContent">
        <Paper className="pageContainer">
          <Typography component={"div"}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="profile.smartlife.title" />
              <span style={{ float: 'right' }}>
                <img src={smartlife_logo} height="36px" alt="smartlife logo"/>
              </span>
            </h4>
            <small>
              <FormattedMessage id="profile.smartlife.subtitle" />
            </small>
          </Typography>
          <Card style={{ marginTop: '25px' }} className="pluginCard">
            <CardContent className="pluginCardContent">
              <Grid container spacing={0}>
                <Grid item md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography>
                    {!smartlife.smartlife.devices ?
                      <FormattedMessage id="profile.smartlife.disconnected" /> :
                      <Button
                        onClick={event => this.handleClickBreadCrumb(event, '/smartlife')}
                        variant="contained"
                        color="primary">
                        <FormattedMessage id="profile.smartlife.connected" />
                      </Button>
                    }
                  </Typography>
                </Grid>
                <Grid item md={6} style={{ textAlign: 'center' }}>
                  {!smartlife.smartlife.devices ?
                  <Button
                    onClick={() => this.setState({ openConnectSmartlifeAccount: true })}
                    variant="contained"
                    color="primary">
                    <FormattedMessage id="profile.smartlife.connect" />
                  </Button>
                  :
                  <Button
                    variant="contained"
                    color="secondary">
                    <FormattedMessage id="profile.smartlife.disconnect" />
                  </Button>}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Paper>
        {this.state.openConnectSmartlifeAccount &&
          <Dialog
            open
            onClose={this.handleClose}
            {...other}
            scroll="body"
          >
            <DialogContent>
              <Typography>
                <h4 className="pageContainerTitle">
                  Hinweis zu Smartlife
                </h4>
                <small>
                  Bitte lies dir diesen Hinweis durch, bevor du deinen Smartlife Account mit Twasi verbindest.
                </small>
              </Typography>
              <br /><br />
              <Button
                onClick={() => { this.handleAuthentication(smartlifeUri + "?environment=" + window.location + "&jwt=" + jwt) }}
                fullWidth
                variant="contained"
                color="primary">
                <FormattedMessage id="profile.smartlife.connect" />
              </Button>
            </DialogContent>
          </Dialog>
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateSmartlifeAccount: () => dispatch(smartlifeOperations.loadSmartlifeAccount()),
  updateSmartlifeAuthUri: () => dispatch(smartlifeOperations.loadSmartlifeAuthUri()),
});

const mapStateToProps = state => ({
  smartlifeUri: smartlifeSelectors.getSmartlifeAuthUri(state),
  smartlife: smartlifeSelectors.getSmartlifeAccount(state),
  jwt: authSelectors.getJwt(state)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SmartLife));
