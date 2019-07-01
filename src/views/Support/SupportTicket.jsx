import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import SupportTicketMessage from './SupportTicketMessage';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const SupportTicket = props => {
  const { ticket } = props;
  return (
    <ExpansionPanel style={{ marginTop: '25px' }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography>
              <small>{ticket.id}</small>
              <Button
                style={{ marginLeft: '5px' }}
                color="primary"
                size="small">
                Ticket ID kopieren
              </Button>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography><h4 className="pageContainerTitle">Betreff</h4><small>{ticket.topic}</small></Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography><h4 className="pageContainerTitle">Erstellt am</h4><small>{ticket.createdAt}</small></Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography><h4 className="pageContainerTitle">Erledigt am</h4><small>{ticket.closedAt || '-'}</small></Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography><h4 className="pageContainerTitle">Status</h4><Chip className="statusBadgeSupport" color="primary" label={ticket.state} /></Typography>
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <Card style={{ borderRadius: '0px 0px 4px 4px' }} className="pluginCard">
        <CardContent style={{ padding: '24px' }}>
          {ticket.messages.map((message, index) =>
            <SupportTicketMessage isStaff={message.staff} sender={message.sender} message={message} displayCloseMessage={index === ticket.messages.length - 1 && ticket.state === 'CLOSED'} />)
          }
          <TextField
            label="Eine Nachricht hinzufügen"
            fullWidth
            multiline
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="close_ticket"
                      />
                    }
                    label="Ticket schließen"
                  />
                  <IconButton
                    aria-label="send-support-message"
                  >
                    <Icon>
                      send
                    </Icon>
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </CardContent>
      </Card>
    </ExpansionPanel>
  );
};

SupportTicket.propTypes = {
  ticket: PropTypes.shape({}).isRequired
};

export default SupportTicket;
