import React from 'react';
import Chip from '@material-ui/core/Chip';

const NotFunctionalAlert = () => (
  <Chip style={{ marginTop: '15px' }} color="secondary" label="Du hast dieses Plugin deinstalliert. Bitte installiere das entsprechende Plugin, um hier eine Ansicht zu erhalten." />
);

export default NotFunctionalAlert;
