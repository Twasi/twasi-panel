import React from 'react';
import { FormattedMessage } from 'react-intl';

import StatusInfo from './StatusInfo';
import EventLog from './EventLog';

const Status = () => (
  <div>
    <h2>
      <FormattedMessage id="sidebar.status" />
    </h2>
    <StatusInfo />
    <EventLog />
  </div>
);

export default Status;
