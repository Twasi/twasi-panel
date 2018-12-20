import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GraphiQL from 'graphiql';
import Paper from '@material-ui/core/Paper';
// import { Container, Row, Col } from 'react-grid-system';

import { authSelectors } from '../../state/auth';
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
      body: `query=${encodeURI(params.query.split('API_KEY').join(this.props.jwt))}`
    }).then(response => response.json());

    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          Developer Tools
        </h2>
        <Paper className="pageContainer" style={{ height: 800, padding: '0px' }}>
          <GraphiQL fetcher={graphQLFetcher} />
        </Paper>
      </div>
    );
  }
}

Profile.propTypes = {
  jwt: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  jwt: authSelectors.getJwt(state)
});

export default withRouter(
  connect(mapStateToProps)(Profile)
);
