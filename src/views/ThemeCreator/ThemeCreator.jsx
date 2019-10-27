import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import ColorPicker from './ColorPicker'

class ThemeCreator extends Component {
  render() {
    return (
      <div className="pageContent">
        <Paper className="pageContainer">
          <Typography component={'span'}>
            <h4 className="pageContainerTitle">
              Theme Maker
            </h4>
            <small>
              cool stuff
            </small>
          </Typography>
        </Paper>
        <Paper className="pageContainer">
          <ColorPicker/>
        </Paper>
      </div>
    );
  }
}

export default ThemeCreator;
