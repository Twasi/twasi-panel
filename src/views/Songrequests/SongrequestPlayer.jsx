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

const SongrequestPlayer = props => (
  <div className="songrequestPlayer">
    <Paper>
      <div style={{ position: 'relative', zIndex: '50', display: 'flex' }}>
        <img
          src="https://qph.fs.quoracdn.net/main-qimg-4441921147e85b468845f56460c53654"
          alt="albumcover"
          style={{ height: '125px' }}
        />
        <div className="playerControl">
          <Grid container spacing={0}>
            <Grid item xs={12} style={{ marginBottom: '5px' }}>
              <Typography color="textPrimary">
                <h5 style={{ padding: '0px', margin: '0px' }}>
                  Krasser Songtitel
                  <br />
                  <small>Noch krasserer Interpret</small>
                </h5>
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ position: 'absolute', bottom: '15px' }}>
              <Chip
                style={{ marginRight: '15px' }}
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
              <Fab size="small" style={{ margin: '0px 5px 0px 5px', boxShadow: 'none' }} color="primary" aria-label="previous">
                <Icon className="actionButtons">skip_previous</Icon>
              </Fab>
              <Fab size="small" style={{ margin: '0px 5px 0px 5px', boxShadow: 'none' }} color="primary" aria-label="play">
                <Icon className="actionButtons">play_arrow</Icon>
              </Fab>
              <Fab size="small" style={{ margin: '0px 5px 0px 5px', boxShadow: 'none' }} color="primary" aria-label="skip">
                <Icon className="actionButtons">skip_next</Icon>
              </Fab>
            </Grid>
          </Grid>
        </div>
      </div>
    </Paper>
  </div>
);

export default SongrequestPlayer;
