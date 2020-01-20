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

class SmartLife extends Component {

  state = {
    openConnectSmartlifeAccount: false
  };

  handleClose = () => {
    this.setState({ openConnectSmartlifeAccount: false })
  };

  render() {
    const { classes, onClose, ...other } = this.props;
    return (
      <div className="pageContent">
        <Paper className="pageContainer">
          <Typography component={"div"}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="profile.smartlife.title" />
              <span style={{ float: 'right' }}>
                <img src={smartlife_logo} height="36px"/>
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
                    Nicht verbunden
                  </Typography>
                </Grid>
                <Grid item md={6} style={{ textAlign: 'center' }}>
                  <Button
                    onClick={() => this.setState({ openConnectSmartlifeAccount: true })}
                    variant="contained"
                    color="primary">
                    <FormattedMessage id="profile.smartlife.connect" />
                  </Button>
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

});

const mapStateToProps = state => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SmartLife));
