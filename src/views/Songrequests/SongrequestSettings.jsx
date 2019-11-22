import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class SongrequestSettings extends React.Component {

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  render() {
    const { classes, onClose, ...other } = this.props;
    return (
      <Dialog
        onClose={this.handleClose}
        scroll="body"
        {...other}
      >
        <DialogContent>
          <Typography component={"div"}>
            <h4 className="pageContainerTitle">
              Einstellungen
            </h4>
            <small>
              Hier kannst du Einstellungen zu den Songrequests vornehmen.
            </small>
          </Typography>
        <Card style={{ marginTop: '25px' }} className="pluginCard">
          <CardContent className="pluginCardContent anim">
            <Grid container spacing={3}>
              <Grid item sm={6}>
                <Button
                  variant="contained"
                  color="secondary">
                  Account <b>Blechkelle</b> trennen
                </Button>
              </Grid>
              <Grid item sm={6} style={{ textAlign: 'right' }}>
                <FormControlLabel
                  label="Youtube Songrequests"
                  labelPlacement="start"
                  control={
                    <Switch
                      checked={true}
                      color="primary"
                    />
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ marginTop: '25px' }} className="pluginCard">
          <CardContent className="pluginCardContent anim">
            <Grid container spacing={3}>
              <Grid item sm={6}>
                <Button
                  variant="contained"
                  color="primary">
                  Spotify Account verbinden
                </Button>
              </Grid>
              <Grid item sm={6} style={{ textAlign: 'right' }}>
                <FormControlLabel
                  label="Spotify Songrequests"
                  labelPlacement="start"
                  control={
                    <Switch
                      checked={true}
                      color="primary"
                    />
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <br />
        Wir ermöglichen die Wiedergabe von Songrequests über den Spotify Musikdienst und über YouTube.
        Bitte beachte, dass die Wiedergabe nicht-eigener Werke im eigenen Livestream eine Copyrightverletzung darstellen kann,
        solange nicht die entsprechenden Lizenzen eingeholt wurden.
        Bei Nichtwissen über die Rechtslage empfehlen wir, auf die Songrequest-Funktion zu verzichten.
        Twasi bzw. das Twasi Team haftet nicht für Verletzungen des Urheberrechts.
        </DialogContent>
      </Dialog>
    );
  }
}

export default SongrequestSettings;
