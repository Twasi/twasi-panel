import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shown: false
    };

    window.setWelcome = value => this.setState({ shown: value });
  }

  render() {
    if (this.state.shown) {
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
    return this.props.children;
  }
}

Welcome.propTypes = {
  children: PropTypes.element
};

export default Welcome;
