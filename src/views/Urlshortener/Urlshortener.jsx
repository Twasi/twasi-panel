import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-grid-system';
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
        <Paper className="pageContainer">
          <Row>
            <Col sm={12}>
              <h4 className="pageContainerTitle">URL Kürzer</h4>
              <small>Kürze deine URLs um sie mit jedem zu teilen.</small>
            </Col>
          </Row>
          <br />
          <Divider />
        </Paper>
      </div>
    );
  }
}

Urlshortener.propTypes = {};
