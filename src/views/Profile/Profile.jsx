import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
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
    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="sidebar.profile" />
        </h2>
        <Paper className="pageContainer">Profile</Paper>
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
