import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import './_style.css';

class Support extends Component {

  render() {
    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="sidebar.support" />
        </h2>
        <Paper className="pageContainer">
          <h4 className="pageContainerTitle">
            Support
            <span style={{ float: 'right' }}>
              <Button variant="contained" color="primary">
                Aktualisieren
              </Button>
            </span>
          </h4>
          <small>
            Support Anfragen
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

Support.propTypes = {};

export default withRouter(connect()(Support));
