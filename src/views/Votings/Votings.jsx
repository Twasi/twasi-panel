import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
// import { Container, Row, Col } from 'react-grid-system';

import './_style.css';

class Votings extends Component {

  render() {
    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="sidebar.votings" />
        </h2>
        <Paper className="pageContainer">
          <h4 className="pageContainerTitle">
            Umfragen
            <span style={{ float: 'right' }}>
              <Button variant="contained" color="primary">
                Aktualisieren
              </Button>
            </span>
          </h4>
          <small>
            Verwalte deine Umfragen.
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

Votings.propTypes = {};

export default withRouter(connect()(Votings));
