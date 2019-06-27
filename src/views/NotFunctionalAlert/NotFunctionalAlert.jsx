import React from 'react';
import Chip from '@material-ui/core/Chip';

const NotInstalledAlert = () => (
  <Chip style={{ marginTop: '15px' }} color="secondary" label="Diese Seite kann Funktionen beinhalten, die in der aktuellen Version nur teilweise bzw. noch nicht fertiggestellt sind." />
);

export default NotInstalledAlert;
