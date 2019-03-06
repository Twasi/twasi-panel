import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';

import './_style.css';

class UserFeedback extends Component {

  render() {
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" href="/">
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.userfeedback" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer">
          <h4 className="pageContainerTitle">
            User Feedback
            <span style={{ float: 'right' }}>
              <Button variant="contained" color="primary">
                <Icon style={{ marginRight: '5px' }}>cached</Icon>
                Aktualisieren
              </Button>
            </span>
          </h4>
          <small>
            Liste aller eingegangenen Feedback Einträge.
          </small>
          <Divider className="marginDivider" />
          <Card className="pluginCard">
            <CardContent />
          </Card>
        </Paper>
      </div>
    );
  }
}

UserFeedback.propTypes = {};

export default withRouter(connect()(UserFeedback));
