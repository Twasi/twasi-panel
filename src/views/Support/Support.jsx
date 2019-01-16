import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import './_style.css';

class Support extends Component {

  render() {
    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="sidebar.support" />
        </h2>
        <Paper className="pageContainer">
          <h4 className="pageContainerTitle">
            Deine Support Tickets
            <span style={{ float: 'right' }}>
              <Button variant="contained" color="primary">
                Neues Ticket erstellen
              </Button>
            </span>
          </h4>
          <small>
            Falls du Fragen hast oder Hilfe benötigst kannst du hier ganz einfach ein Support Ticket erstellen.
          </small>
          <Divider className="marginDivider" />
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={24}>
                <Grid item xs={3}>
                  <Typography><h4 className="pageContainerTitle">Betreff</h4><small>Frage zu einer Funktion</small></Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography><h4 className="pageContainerTitle">Erstellt am</h4><small>16.01.2019 - 09:45</small></Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography><h4 className="pageContainerTitle">Letzte Änderung</h4><small>16.01.2019 - 12:15</small></Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography><h4 className="pageContainerTitle">Status</h4><Chip className="statusBadgeSupport" color="primary" label="offen" /></Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <Card style={{ borderRadius: '0px 0px 4px 4px' }} className="pluginCard">
              <CardContent style={{ padding: '24px' }}>
                <Grid container spacing={24}>
                  <Grid item>
                    <Avatar>Du</Avatar>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography className="chatBubbleSelf">
                      Wie funktioniert die Zeitmaschine bei Twasi?
                      Ich habe noch keine Möglichkeit gefunden sie zum laufen zu bringen...
                      Muss ich dafür ein Ticket erstellen oder antwortet ihr hier eh nicht drauf?
                      Habe gehört hinter Twasi sitzt ein voll nettes Team, deswegen dachte ich mir, machste mal ein Ticket auf.
                    </Typography>
                  </Grid>
                  <Grid item xs={3} />
                </Grid>
                <br />
                <Grid container spacing={24}>
                  <Grid item xs={3} />
                  <Grid item xs={8}>
                    <Typography className="chatBubbleSupport">
                      Du musst solange auf den Grün/Blau blinkenden Knopf drücken, bis er nichtmehr blinkt.
                      danach gehst du zum nächsten Supermarkt,
                      besorgst dir eine PSC und spendest sie an einen wohltätigen Zweck.
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar>Sup</Avatar>
                  </Grid>
                </Grid>
                <br />
                <TextField
                  label="Eine Antwort hinzufügen"
                  helperText="0/500"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="send-support-message"
                        >
                          <Icon>
                            send
                          </Icon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </CardContent>
            </Card>
          </ExpansionPanel>
        </Paper>
      </div>
    );
  }
}

Support.propTypes = {};

export default withRouter(connect()(Support));
