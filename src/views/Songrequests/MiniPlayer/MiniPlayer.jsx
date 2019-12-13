import "./_style.css";
import * as React from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function getPlayerPosition() {
  let player = document.getElementById('sr-mini-player');
  let playerInfo = document.getElementById('mini-player-infos');
  player.style.position = 'fixed'
  player.style.top = ''
  player.style.left = ''
  playerInfo.style.display = ''
}

class SongRequestMiniPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {big: true}
    }

    decodeHtml = (html) => {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    componentDidMount() {
        let retractTimeout;
        const retract = (show) => {
            if (this.state.show) this.setState({retract: false});
            clearTimeout(retractTimeout);
            if (show) setTimeout(() => {
                if (this.state.show) this.setState({retract: true})
            }, 2800);
            else this.setState({retract: false});
        };
        const on = (event, handler) => window.TSRI.local.manager.eventDistributor.onChange(event, handler, "miniplayer");
        on("status", status => this.setState({status}));
        on("position", ({pos, formattedPos}) => this.setState({pos, formattedPos}));
        on("song", song => {
            if (song && (!this.state.song || this.state.song.uri !== song.uri)) retract(this.state.show);
            this.setState({song});
        });
        on("playState", playing => this.setState({playing}));
        on("showMiniPlayer", show => {
            getPlayerPosition();
            if (!this.state.show && show) retract(show);
            this.setState({show});
        });
    }

    render() {
        return (
                <Paper
                  id={'sr-mini-player'}
                  className={
                      (this.state.show && this.state.song ? 'show' : 'hide') +
                      (this.state.song && this.state.song.provider === 2 ? ' youtube' : '') +
                      (this.state.retract ? ' retract' : ' expanded')
                  }
                  playing
                  style={{display: 'flex', padding: '0px'}}>
                  <div style={{ position: 'absolute', display: this.state.song && this.state.song.provider === 2 ? '' : 'none', height: !this.state.show ? 200 : 100, width: !this.state.show ? 355 : 178 }}/>
                  <iframe style={{display: this.state.song && this.state.song.provider === 2 ? '' : 'none'}}
                          title="ytplayer"
                          id="youtube-player"
                          type="text/html"
                          height={!this.state.show ? 200 : 100}
                          width={!this.state.show ? 355 : 178}
                          src="https://www.youtube.com/embed/?showinfo=0&controls=0&enablejsapi=1&autoplay=1"
                          frameBorder="0"
                          allow="autoplay"
                          className={'mini-player-preview'}
                  />
                  <img style={{display: this.state.song && this.state.song.provider === 1 ? '' : 'none'}}
                       height={100}
                       width={'auto'}
                       className={'mini-player-preview'}
                       alt={'Song cover'}
                       src={this.state.song && this.state.song.provider === 1 ? this.state.song.covers[0] : ''}/>
                  <Typography id={'mini-player-infos'}>
                      <span id={'mp-song-title'} hidden={!this.state.song}>
                        {this.state.song && this.state.song.name}
                      </span>
                      <span id={'mp-song-artist'} hidden={!this.state.song}>
                        {this.state.song && this.state.song.formattedArtists}
                      </span>
                  </Typography>
                </Paper>
        )
    }
}

export default SongRequestMiniPlayer;
