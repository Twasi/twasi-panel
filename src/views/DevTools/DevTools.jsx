import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GraphiQL from 'graphiql';
import Paper from 'material-ui/Paper';
// import { Container, Row, Col } from 'react-grid-system';

import { statusSelectors, statusOperations } from '../../state/status';
import './_style.css';

class Profile extends Component {
  /* componentWillMount() {
    const { verifyData } = this.props;
    verifyData();
  } */

  render() {
    const graphQLFetcher = params => fetch(`${window.env.GRAPHQL_URL}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: `query=${encodeURI(params.query)}`
    }).then(response => response.json());

    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          Developer Tools
        </h2>
        <Paper className="pageContainer" style={{ height: 800 }}>
          <GraphiQL fetcher={graphQLFetcher} />
        </Paper>
      </div>
    );
  }
}

Profile.propTypes = {};

const mapStateToProps = state => ({
  status: statusSelectors.getStatus(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(statusOperations.verifyData())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
