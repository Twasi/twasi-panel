import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const SupportTicketMessage = props => {
  const { isStaff, displayCloseMessage, sender, message } = props;

  const getAvatar = () => (
    <Grid item key="avatar">
      <Avatar>
        <img width="45px" height="45px" src={sender.avatar} alt="Avatar" />
      </Avatar>
    </Grid>
  );

  const getMessage = () => (
    <Grid item xs={8} key="message">
      <Typography style={{ position: 'relative', paddingBottom: '25px' }} className={isStaff ? 'chatBubbleSelf' : 'chatBubbleSupport'}>
        <Typography className="chatName">{sender.name}</Typography>
        {message.message}
        <Typography className="chatTime">{message.createdAt}</Typography>
      </Typography>
      {displayCloseMessage &&
      <Typography style={{ position: 'relative', marginTop: '5px' }} className={isStaff ? 'chatBubbleSelf' : 'chatBubbleSupport'}>
        {sender.name} hat das Ticket um {message.createdAt} geschlossen. Du kannst jederzeit ein neues Ticket eröffnen.
      </Typography>}
    </Grid>
  );

  const getSpacing = () => (
    <Grid item xs={3} key="spacing" />
  );

  const composedMessage = isStaff ? [getAvatar(), getMessage(), getSpacing()] : [getSpacing(), getMessage(), getAvatar()];

  return (
    <Fragment>
      <Grid container spacing={24}>
        {composedMessage}
      </Grid>
      <br />
    </Fragment>
  );
};

SupportTicketMessage.propTypes = {
  isStaff: PropTypes.bool.isRequired,
  displayCloseMessage: PropTypes.bool.isRequired,
  sender: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  })
};

export default SupportTicketMessage;
