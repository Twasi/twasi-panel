import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class PublicUnban extends Component {

  render() {
    return (
      <Paper className="pageContainer">
        <Typography component={"div"}>
          <h4 className="pageContainerTitle">
            Entbannantrag stellen
          </h4>
          <small>
            Du wurdest zu unrecht gebannt? Hier kannst du einen Antrag auf Entbannung stellen.
          </small>
        </Typography>
      </Paper>
    );
  }
}

export default PublicUnban;
