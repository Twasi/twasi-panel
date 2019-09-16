import React, { Fragment } from 'react';
//import { withStyles } from '@material-ui/core/styles';
//import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
//import Rating from '@material-ui/lab/Rating';
//import FavoriteIcon from '@material-ui/icons/Favorite';
//import TextField from '@material-ui/core/TextField';
//import InputAdornment from '@material-ui/core/InputAdornment';
//import IconButton from '@material-ui/core/IconButton';
//import Icon from '@material-ui/core/Icon';

const SupportTicketMessage = props => {
  const { isStaff, displayCloseMessage, sender, message } = props;
  const getAvatar = () => (
    <Grid item key="avatar">
      <Avatar>
        <img width="45px" height="45px" src={sender.avatar} alt="Avatar" />
      </Avatar>
    </Grid>
  );

  //const [value] = React.useState(3);

  /*
  const StyledRating = withStyles({
    iconFilled: {
      color: '#ff6d75',
    },
    iconHover: {
      color: '#ff3d47',
    },
  })(Rating);
  */

  const getMessage = () => (
    <Grid item xs={8} key={message.message}>
      <Typography component={'div'} style={{ position: 'relative', paddingBottom: '25px' }} className={isStaff ? 'chatBubbleSupport' : 'chatBubbleSelf'}>
        <Typography className="chatName">{sender.name}</Typography>
        <small>{message.message.split('<br />').map((item, index) => [item, index !== message.message.split('<br />').length - 1 ? <br /> : null])}</small>
        <Typography className="chatTime">{new Date(message.createdAt).toLocaleString()}</Typography>
      </Typography>
      {displayCloseMessage &&
      <Typography style={{ position: 'relative', marginTop: '5px' }} className={isStaff ? 'chatBubbleSupport' : 'chatBubbleSelf'}>
        <small>{sender.name} hat das Ticket am {new Date(message.createdAt).toLocaleString()} geschlossen. Du kannst jederzeit ein neues Ticket eröffnen.</small>
          {/*<br /><br />
          <Typography component="legend"><small><FormattedMessage id="support.ticket.rating.could_we_help" /></small></Typography>
          <StyledRating
            name="customized-color"
            value={value}
            onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
          />
          {value < 3 &&
            <TextField
              style={{ marginTop: '10px' }}
              label={<FormattedMessage id="support.ticket.rating.what_was_wrong" />}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="send-support-message"
                      onClick=""
                    >
                      <Icon>
                        send
                      </Icon>
                    </IconButton>
                  </InputAdornment>
                )
              }}>
            </TextField>}*/}
      </Typography>}
    </Grid>
  );

  const getSpacing = () => (
    <Grid item xs={3} key="spacing" />
  );

  const composedMessage = isStaff ? [getAvatar(), getMessage(), getSpacing()] : [getSpacing(), getMessage(), getAvatar()];

  return (
    <Fragment>
      <Grid container spacing={2}>
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
  })
};

export default SupportTicketMessage;
