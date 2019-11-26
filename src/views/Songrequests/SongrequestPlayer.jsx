import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import VolumeIcon from '@material-ui/icons/VolumeUp';
import Slider from '@material-ui/core/Slider';

class SongrequestPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playback: false,
    };
  }

  handleChangePlayback = () => {
    this.setState({ playback: !this.state.playback })
  }

  render() {
    return (
      <div className="songrequestPlayer">
        <Paper>
          <div style={{ position: 'relative', zIndex: '50', display: 'flex' }}>
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/91ODLT7BLmL._SX466_.jpg"
              alt="albumcover"
              style={{ height: '125px' }}
            />
            <div className="playerControl">
              <Grid container spacing={0}>
                <Grid item xs={12} style={{ marginBottom: '5px' }}>
                  <Typography color="textPrimary">
                    <h5 style={{ padding: '0px', margin: '0px' }}>
                      Snow (Hey Oh)
                      <br />
                      <small>Red Hot Chilli Peppers</small>
                    </h5>
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ position: 'absolute', bottom: '15px' }}>
                  <Fab size="small" style={{ margin: '0px 5px 0px 0px', boxShadow: 'none' }} color="primary" aria-label="previous">
                    <Icon className="actionButtons">skip_previous</Icon>
                  </Fab>
                  <Fab onClick={this.handleChangePlayback} size="small" style={{ margin: '0px 5px 0px 5px', boxShadow: 'none' }} color="primary" aria-label="play">
                    <Icon className="actionButtons">{this.state.playback ? 'stop' : 'play_arrow'}</Icon>
                  </Fab>
                  <Fab size="small" style={{ margin: '0px 5px 0px 5px', boxShadow: 'none' }} color="primary" aria-label="skip">
                    <Icon className="actionButtons">skip_next</Icon>
                  </Fab>
                  <Chip
                    style={{ marginLeft: '15px' }}
                    avatar={
                      <Avatar>
                        <VolumeIcon />
                      </Avatar>
                    }
                    label={<div style={{
                      padding: '5px 0px 0px 5px',
                      margin: '12px 0px 11px 0px',
                      width: '100px' }}>
                      <Slider
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto" />
                    </div>}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}
export default SongrequestPlayer;
