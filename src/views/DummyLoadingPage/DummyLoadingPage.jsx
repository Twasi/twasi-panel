import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class DummyLoadingPage extends Component {
  /* componentWillMount() {
    const { verifyData } = this.props;
    verifyData();
  } */

  render() {
    return (
      <div className="pageContent" style={{ marginBottom: '25px' }}>
        <Grid container spacing={24}>
          <Grid item xs={2}>
            <Paper className="pageContainer" style={{ height: '500px' }} />
          </Grid>
          <Grid item xs={10}>
            <Paper className="pageContainer" style={{ height: '250px' }} />
            <Paper className="pageContainer" style={{ height: '250px' }} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

DummyLoadingPage.propTypes = {};

export default withRouter(connect()(DummyLoadingPage));
