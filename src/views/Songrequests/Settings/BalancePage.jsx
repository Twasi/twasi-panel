import React, { Component } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Icon from '@material-ui/core/Icon';
//import Fab from '@material-ui/core/Fab';
//import Chip from '@material-ui/core/Chip';
//import Avatar from '@material-ui/core/Avatar';

import gachiHYPER from '../../common/resources/gachiHYPER.gif';

const marks = [
  {
    value: 0,
    label: 'Spotify',
  },
  {
    value: 0.1,
    label: '\'',
  },
  {
    value: 0.2,
    label: '\'',
  },
  {
    value: 0.3,
    label: '\'',
  },
  {
    value: 0.4,
    label: '\'',
  },
  {
    value: 0.5,
    label: '|',
  },
  {
    value: 0.6,
    label: '\'',
  },
  {
    value: 0.7,
    label: '\'',
  },
  {
    value: 0.8,
    label: '\'',
  },
  {
    value: 0.9,
    label: '\'',
  },
  {
    value: 1,
    label: 'YouTube',
  }
];

class BalancePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      changeBalanceSlider: false,
      balance: 0.5,
      previewplayback: false
    };
  }

  componentDidMount() {
    window.TSRI.local.manager.eventDistributor.onChange("settings", (event) => {
      this.setState({balance: event.volumeBalance})
    })
  }

  handleBalanceChange = (event, balance) => {
      this.setState({balance});
      this.setState({changeBalanceSlider: true});
  };

  handleBalanceSet = (event, balance) => {
      this.setState({balance});
      this.setState({changeBalanceSlider: false});
      window.TSRI.playback.setVolumeBalance(balance);
  };

  handleChangePreviewPlayback = async () => {
      this.setState({previewplayback: !this.state.previewplayback})
      if (!this.state.previewplayback) {
          this.setState({previewplayback: !this.state.previewplayback})
      }
  };

  render() {
    return (
      <div className="pageContent">
        <Typography component={"div"}>
          <h4 className="pageContainerTitle">
            Lautstärke Anpassung
          </h4>
          <small>
            Hier kannst du die Lautstärke Balance zwischen den verschiedenen Platformen anpassen.<br/>
          </small>
        </Typography>
        {/* Starte die Preview und stelle die Lautstärke Balance so ein, dass beide Previews gleich laut sind. */}
        <Grid container spacing={3}>
          {/*
          <Grid item xs={12}>
            <Card style={{ marginTop: '25px' }} className="pluginCard">
              <CardContent style={{ paddingBottom: '25px' }}>
                <Grid container spacing={3}>
                  <Grid item xs={2}>
                    <Fab onClick={this.handleChangePreviewPlayback}
                       style={{ boxShadow: 'none', marginTop: '18px' }} color="primary"
                       aria-label="play">
                      <Icon className="actionButtons">{this.state.previewplayback ? 'stop' : 'play_arrow'}</Icon>
                    </Fab>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography component={"div"}>
                      <h2 className="pageContainerTitle">
                        Krasser Songtitel
                      </h2>
                      <small>
                        Krasser Interpret<br/>
                        über <b>Spotify</b>
                      </small>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className="pluginCard">
              <CardContent className="pluginCardContent">
                <Typography component={"div"}>
                  <h4 className="pageContainerTitle">
                    Spotify
                  </h4>
                  <small>
                    Spotify Beispiel Sequenz
                  </small>
                </Typography>
                <br/>
                <Chip avatar={<Avatar><Icon>volume_up</Icon></Avatar>} color="primary" label="Wird abgespielt"/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className="pluginCard">
              <CardContent className="pluginCardContent">
                <Typography component={"div"}>
                  <h4 className="pageContainerTitle">
                    YouTube
                  </h4>
                  <small>
                    Youtube Beispiel Sequenz
                  </small>
                </Typography>
                <br/>
                <Chip avatar={<Avatar><Icon>volume_off</Icon></Avatar>} color="secondary" label="Wird nicht abgespielt"/>
              </CardContent>
            </Card>
          </Grid>
          */}
          <Grid item xs={12}>
            <Card className="pluginCard" style={{ marginTop: '25px' }}>
              <CardContent style={{ paddingTop: '25px', paddingBottom: '15px' }}>
                <Grid container spacing={3}>
                  <Grid item style={{ textAlign: 'left' }}>
                    <Icon>
                        {this.state.balance === 0 && <img alt="volume_max" src={gachiHYPER} height="24px"/>}
                        {this.state.balance >= 0 && this.state.balance <= 0.4 && 'volume_up'}
                        {this.state.balance >= 0.4 && this.state.balance <= 0.7 && 'volume_down'}
                        {this.state.balance >= 0.7 && this.state.balance <= 1 && 'volume_mute'}
                    </Icon>
                  </Grid>
                  <Grid item xs>
                    <Slider
                      track={false}
                      value={this.state.balance}
                      onChange={this.handleBalanceChange}
                      onChangeCommitted={this.handleBalanceSet}
                      aria-labelledby="track-false-slider"
                      valueLabelDisplay="off"
                      step={0.01}
                      min={0}
                      max={1}
                      marks={marks}
                    />
                  </Grid>
                  <Grid item style={{ textAlign: 'right' }}>
                    <Icon>
                        {this.state.balance === 1 && <img alt="volume_max" src={gachiHYPER} height="24px"/>}
                      {this.state.balance >= 0.6 && this.state.balance <= 1 && 'volume_up'}
                      {this.state.balance >= 0.3 && this.state.balance <= 0.6 && 'volume_down'}
                      {this.state.balance >= 0 && this.state.balance <= 0.3 && 'volume_mute'}
                    </Icon>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default BalancePage;
