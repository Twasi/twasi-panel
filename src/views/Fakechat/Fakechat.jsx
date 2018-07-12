import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
// import { Container, Row, Col } from 'react-grid-system';

import { statusSelectors, statusOperations } from '../../state/status';
import './_style.css';

class Fakechat extends Component {
  /* componentWillMount() {
    const { verifyData } = this.props;
    verifyData();
  } */

  render() {
    return (
      <div className="pageContent">
        <Paper className="pageContainer">
          <h4 className="pageContainerTitle">Fakechat</h4>
          <small>
            Im Fakechat kannst du alle Funktionen des Bots unabhängig deines
            Chats ausprobieren.
          </small>
          <Divider className="marginDivider" />
          <Card className="pluginCard">
            <CardText />
          </Card>
        </Paper>
      </div>
    );
  }
}

Fakechat.propTypes = {};

const mapStateToProps = state => ({
  status: statusSelectors.getStatus(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(statusOperations.verifyData())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Fakechat)
);
