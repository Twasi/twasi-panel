import React from 'react';
import Paper from 'material-ui/Paper';
import { FormattedMessage } from 'react-intl';

class Songrequests extends React.Component {
  render() {
    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="sidebar.songrequests" />
        </h2>
        <Paper className="pageContainer">Songrequests</Paper>
      </div>
    );
  }
}

export default Songrequests;
