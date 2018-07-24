import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Col } from 'react-grid-system';
import Divider from 'material-ui/Divider';
import Paper from '@material-ui/core/Paper';
import './_style.css';

class Urlshortener extends Component {
  render() {
    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="plugins.headline" />
        </h2>
        <Col sm={6}>
          <Paper className="pageContainer">
            <h4 className="pageContainerTitle">URL Kürzer</h4>
            <small>Kürze deine URLs um sie mit jedem zu teilen.</small>
            <br />
            <Divider />
          </Paper>
        </Col>
      </div>
    );
  }
}

Urlshortener.propTypes = {};

export default withRouter(connect()(Urlshortener));
