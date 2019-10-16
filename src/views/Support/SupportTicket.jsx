import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
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

  const getTicketState = state => {
    switch(state) {
      case 'OPEN': return <FormattedMessage id="support.ticket.state.open" />;
      case 'PROGRESS': return <FormattedMessage id="support.ticket.state.progress" />;
      case 'CLOSED': return <FormattedMessage id="support.ticket.state.closed" />;
      default: return <FormattedMessage id="support.ticket.state.open" />;
    }
  }

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
        <Grid style={{ marginTop: '0px' }} container spacing={4}>
          <Grid item xs={6}>
            <Chip
              color="primary"
              avatar={<Avatar style={{ width: '24px', height: '24px' }} alt="ticket_owner_avatar" src={ticket.owner.avatar} />}
              label={ticket.owner.name}
              style={{ marginRight: '5px' }}
            />
            <Chip
              color="secondary"
              label={ticket.category}
              style={{ marginRight: '5px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <Chip
              color="primary"
              label={`#${ticket.id}`}
            />
            <Tooltip title={`Copy: #${ticket.id}`} placement="top">
              <Button
                style={{ marginLeft: '5px' }}
                color="primary"
                size="small"
                onClick={e => {
                  navigator.clipboard.writeText(`#${ticket.id}`);
                  e.stopPropagation();
                }}>
                <FormattedMessage id="support.ticket.copy_ticket_id" />
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={3}>
            <Typography component={'div'}><h5 className="pageContainerTitle"><FormattedMessage id="support.topic" /></h5><small>{ticket.topic}</small></Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography component={'div'}><h5 className="pageContainerTitle"><FormattedMessage id="support.ticket.created_at" /></h5><small>{new Date(ticket.createdAt).toLocaleString()}</small></Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography component={'div'}><h5 className="pageContainerTitle"><FormattedMessage id="support.ticket.closed_at" /></h5><small>{ticket.closedAt ? new Date(ticket.closedAt).toLocaleString() : '-'}</small></Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography component={'div'}>
              <h5 className="pageContainerTitle"><FormattedMessage id="support.ticket.status" /></h5>
              <Chip className="statusBadgeSupport" {...getColorByState(ticket.state)} />
              <small>{getTicketState(ticket.state)}</small>
            </Typography>
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
      <Card className="pluginCard">
        <CardContent style={{ padding: '24px', borderRadius: '0px 0px 16px 16px' }}>
          {ticket.messages.map((messageObj, index) =>
            <SupportTicketMessage key={messageObj.createdAt} isStaff={messageObj.staff} sender={messageObj.sender} message={messageObj} displayCloseMessage={index === ticket.messages.length - 1 && ticket.state === 'CLOSED'} />)
          }
          {ticket.state !== 'CLOSED' &&
          <TextField
            label={<FormattedMessage id="support.ticket.add_message" />}
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
                    label={<FormattedMessage id="support.ticket.close_ticket" />}
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
