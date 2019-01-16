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
                <Grid item xs={4}>
                  <Typography><h4 className="pageContainerTitle">Betreff</h4><small>Frage zu einer Funktion</small></Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography><h4 className="pageContainerTitle">Zeitpunkt</h4><small>16.01.2019 - 09:45</small></Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography><h4 className="pageContainerTitle">Status</h4><Chip className="statusBadgeSupport" color="secondary" label="Noch nicht bearbeitet" /></Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <Card style={{ borderRadius: '0px 0px 4px 4px' }} className="pluginCard">
              <CardContent style={{ padding: '0px' }}>
                <Table>
                  <TableHead
                    adjustForCheckbox={false}
                    displaySelectAll={false}
                    selectable={false}
                  >
                    <TableRow className="TableRow">
                      <TableCell>
                        ID
                      </TableCell>
                      <TableCell>
                        Inhalt
                      </TableCell>
                      <TableCell>
                        Aktionen
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableCell>
                        1
                      </TableCell>
                      <TableCell>
                        Wie funktioniert die Zeitmaschine bei Twasi?
                        Ich habe noch keine Möglichkeit gefunden sie zum laufen zu bringen...
                        Muss ich dafür ein Ticket erstellen oder antwortet ihr hier eh nicht drauf?
                        Habe gehört hinter Twasi sitzt ein voll nettes Team, deswegen dachte ich mir, machste mal ein Ticket auf.
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Löschen" placement="top">
                          <Button
                            variant="fab"
                            className="noshadow"
                            color="secondary"
                            mini
                            aria-label="deleteTicket"
                          >
                            <Icon style={{ color: '#ffffff' }}>delete</Icon>
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </ExpansionPanel>
          <br />
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={24}>
                <Grid item xs={4}>
                  <Typography><h4 className="pageContainerTitle">Betreff</h4><small>Frage zu einer Funktion</small></Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography><h4 className="pageContainerTitle">Zeitpunkt</h4><small>16.01.2019 - 09:45</small></Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography><h4 className="pageContainerTitle">Status</h4><Chip className="statusBadgeSupport" color="primary" label="Beantwortet" /></Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <Card style={{ borderRadius: '0px 0px 4px 4px' }} className="pluginCard">
              <CardContent style={{ padding: '0px' }}>
                <Table>
                  <TableHead
                    adjustForCheckbox={false}
                    displaySelectAll={false}
                    selectable={false}
                  >
                    <TableRow className="TableRow">
                      <TableCell>
                        ID
                      </TableCell>
                      <TableCell>
                        Inhalt
                      </TableCell>
                      <TableCell>
                        Antwort
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableCell>
                        2
                      </TableCell>
                      <TableCell>
                        Wie funktioniert die Zeitmaschine bei Twasi?
                        Ich habe noch keine Möglichkeit gefunden sie zum laufen zu bringen...
                        Muss ich dafür ein Ticket erstellen oder antwortet ihr hier eh nicht drauf?
                        Habe gehört hinter Twasi sitzt ein voll nettes Team, deswegen dachte ich mir, machste mal ein Ticket auf.
                      </TableCell>
                      <TableCell>
                        Du musst solange auf den Grün/Blau blinkenden Knopf drücken, bis er nichtmehr blinkt. danach gehst du zum nächsten Supermarkt, besorgst dir eine PSC und spendest sie an einen wohltätigen Zweck.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
