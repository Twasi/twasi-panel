import React, { useState } from 'react';
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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';

import SupportTicketMessage from './SupportTicketMessage';

const SupportTicket = props => {
  const { ticket, reply, isAdminContext, open, setOpen } = props;

  const [message, setMessage] = useState('');
  const [close, setClose] = useState(false);

  const sendReply = () => {
    reply(ticket.id, close, isAdminContext, message).then(() => {
      setMessage('');
      setClose(false);
    });
  };

  const getColorByState = state => {
    if (state === 'OPEN') {
      return { color: 'primary' };
    } else if (state === 'PROGRESS') {
      return { style: { backgroundColor: 'orange' } };
    }
    return { color: 'secondary' };
  };

  return (
    <ExpansionPanel
      style={{ marginTop: '25px' }}
      expanded={open}
      onChange={(e, expanded) => {
        if (expanded) {
          setOpen(ticket.id);
        } else {
          setOpen('');
        }
      }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography>
              <small>#{ticket.id}</small>
              <Tooltip title={`Copy: #${ticket.id}`} placement="top">
                <Button
                  style={{ marginLeft: '5px' }}
                  color="primary"
                  size="small"
                  onClick={e => {
                    navigator.clipboard.writeText(`#${ticket.id}`);
                    e.stopPropagation();
                  }}>
                  Ticket ID kopieren
                </Button>
              </Tooltip>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography><h4 className="pageContainerTitle">Betreff</h4><small>{ticket.topic}</small></Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography><h4 className="pageContainerTitle">Erstellt am</h4><small>{new Date(ticket.createdAt).toLocaleString()}</small></Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography><h4 className="pageContainerTitle">Erledigt am</h4><small>{ticket.closedAt ? new Date(ticket.closedAt).toLocaleString() : '-'}</small></Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <h4 className="pageContainerTitle">Status</h4>
              <Chip className="statusBadgeSupport" {...getColorByState(ticket.state)} label={ticket.state} />
            </Typography>
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <Card style={{ borderRadius: '0px 0px 4px 4px' }} className="pluginCard">
        <CardContent style={{ padding: '24px' }}>
          {ticket.messages.map((messageObj, index) =>
            <SupportTicketMessage isStaff={messageObj.staff} sender={messageObj.sender} message={messageObj} displayCloseMessage={index === ticket.messages.length - 1 && ticket.state === 'CLOSED'} />)
          }
          {ticket.state !== 'CLOSED' &&
          <TextField
            label="Eine Nachricht hinzufügen"
            fullWidth
            multiline
            variant="outlined"
            value={message}
            onChange={e => setMessage(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={close}
                        onChange={(e, checked) => setClose(checked)}
                      />
                    }
                    label="Ticket schließen"
                  />
                  <IconButton
                    aria-label="send-support-message"
                    onClick={sendReply}
                  >
                    <Icon>
                      send
                    </Icon>
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          }
        </CardContent>
      </Card>
    </ExpansionPanel>
  );
};

SupportTicket.propTypes = {
  ticket: PropTypes.shape({}).isRequired,
  reply: PropTypes.func.isRequired,
  isAdminContext: PropTypes.bool.isRequired,
  open: PropTypes.bool,
  setOpen: PropTypes.func
};

export default SupportTicket;
