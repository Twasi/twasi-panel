import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import { appInfoSelectors, appInfoOperations } from '../../state/appInfo';

class Welcome extends Component {
  componentDidMount() {
    const { updateUserStatus } = this.props;
    updateUserStatus();
  }

  render() {
    const { userStatus, children } = this.props;

    if (userStatus === 'OK') {
      return children;
    }
    if (userStatus === 'SETUP') {
      return (
        <div className="content">
          <div className="pageContent">
            <h2 className="pageTitle">Welcome</h2>
            <Paper className="pageContainer" style={{ height: 600 }}>
            Page Content
            </Paper>
          </div>
        </div>);
    }

    return <div>Loading...</div>;
  }
}

Welcome.propTypes = {
  children: PropTypes.node,
  userStatus: PropTypes.string,
  updateUserStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userStatus: appInfoSelectors.getUserStatus(state)
});

const mapDispatchToProps = dispatch => ({
  updateUserStatus: () => dispatch(appInfoOperations.loadUserStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
