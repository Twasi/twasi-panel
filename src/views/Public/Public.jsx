import React from 'react';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';

const Public = () => (
  <div className="pageContent">
    <h2 className="pageTitle">
      <FormattedMessage id="public.headline" />
    </h2>
    <Paper className="pageContainer">Public</Paper>
  </div>
);

export default Public;
