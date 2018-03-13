import React from 'react';
import { FormattedMessage } from 'react-intl';
import Paper from 'material-ui/Paper';

import StatusInfo from './StatusInfo';
import EventLog from './EventLog';

const Status = () => (
  <div className="pageContent">
    <h2 className="pageTitle">
      <FormattedMessage id="sidebar.status" />
    </h2>
    <Paper className="pageContainer">
      <StatusInfo />
      <br />
      <EventLog />
    </Paper>
  </div>
);

export default Status;
