import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class SongrequestSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      issue: '',
    };
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleSubmitIssue = (issue) => {
    window.TSRI.report(issue)
    this.props.onClose(this.props.selectedValue);
  };

  handleIssueChange = (event) => {
    if(event.target.value.length <= 1000) {
      this.setState({
        issue: event.target.value
      });
    }
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
              Problem mit der Wiedergabe melden
            </h4>
            <small>
              Falls es Probleme mit der Wiedergabe der Songrequests gibt, kannst du hier dein Problem melden.<br/><br/>
              Bitte versuche, nachdem du dein Problem gemeldet hast, deinen Spotify Account neu zu verbinden. Du kannst deinen Spotify Account unter den Songrequest Einstellungen (Zahnrad) neu verbinden.<br/><br/>
              Desweiteren kann ein Reload der Seite helfen.
            </small>
          </Typography>
          <Card style={{ marginTop: '25px' }} className="pluginCard">
            <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="issue"
                label="Beschreibung des Problems"
                helperText="Bitte beschreibe dein Problem so genau wie es geht."
                fullWidth
                multiline
                rows="3"
                autoFocus
                value={this.state.issue}
                onChange={this.handleIssueChange}
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
          <Button
            disabled={!this.state.issue.trim()}
            fullWidth
            style={{ marginTop: '15px' }}
            variant="contained"
            color="primary"
            onClick={() => {
                this.handleSubmitIssue(this.state.issue)
            }}>
            Problem melden
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default SongrequestSettings;
