import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';

import './_style.css';

class Timer extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  handleChange = (event, interval) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ interval });
  };

  state = {
    interval: 0
  };

  getCooldown() {
    let iv = this.state.interval;

    if (iv <= 60) {
      if (iv === 0) {
        return '1 Minute';
      } else if (iv === 60) {
        iv = 1;
        return `${iv} Stunde`;
      }
      if (iv > 1) {
        return `${iv} Minuten`;
      }
      return `${iv} Minute`;
    }
    return 'Fehler';
  }

  render() {
    const { onClose, ...other } = this.props;
    const { interval } = this.state;

    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
      >
        <DialogContent>
          <Typography component={'div'}>
            <h3 className="pageContainerTitle">
              <FormattedMessage id="timers.new_timer" />
            </h3>
            <small>
              <FormattedMessage id="timers.new_timer.subheadline" />
            </small>
          </Typography>
          <br /><br />
          <Card className="pluginCard">
            <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-textarea"
                label={<FormattedMessage id="timers.new_timer.timer" />}
                fullWidth
                placeholder="Beispiel: !hosts"
                helperText="Das ist dein Timer. Der Timer wird automatisch in dem eingestellten Interval ausgelöst."
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-textarea"
                label={<FormattedMessage id="timers.new_timer.output" />}
                fullWidth
                placeholder="Beispiel: Mein Bot heißt Twasibot."
                multiline
                rows="3"
                helperText="Das ist die Ausgabe deines Timers."
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '0px', paddingBottom: '8px' }}>
              <Typography style={{ paddingTop: '8px', paddingLeft: '12px', fontSize: '0.775rem' }}>Interval: {this.getCooldown()}</Typography>
              <Slider
                style={{ padding: '22px 0px' }}
                aria-labelledby="label"
                value={interval}
                min={0}
                max={60}
                step={1}
                onChange={this.handleChange}
              />
              <Typography style={{ paddingLeft: '12px', fontSize: '0.775rem' }}>Hier kannst du einen Interval von bis zu einer Stunde einstellen.</Typography>
            </CardContent>
          </Card>
          <Button fullWidth style={{ borderRadius: '4px', marginTop: '15px' }} variant="contained" color="primary">
            <FormattedMessage id="timers.new_timer.savetimer" />
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

Timer.propTypes = {
  onClose: PropTypes.func,
};

export default (Timer);
