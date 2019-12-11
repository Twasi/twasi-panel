import "./_style.css";
import * as React from "react";

class SongRequestMiniPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {big: true}
    }

    componentDidMount() {
        const on = (event, handler) => window.TSRI.local.manager.eventDistributor.onChange(event, handler, "miniplayer");
        on("status", status => this.setState({status}));
        on("position", ({pos, formattedPos}) => this.setState({pos, formattedPos}));
        on("song", song => this.setState({song}));
        on("playState", playing => this.setState({playing}));
        let retractTimeout;
        on("showMiniPlayer", show => {
            this.setState({show});
            clearTimeout(retractTimeout);
            if (show) setTimeout(() => {
                if (this.state.show) this.setState({retract: true})
            }, 2800);
            else this.setState({retract: false});
        });
    }

    render() {
        return (
            <div
                id={'sr-mini-player'}
                className={
                    (this.state.show ? 'show' : '') +
                    (this.state.song && this.state.song.provider === 2 ? ' youtube' : '') +
                    (this.state.retract ? ' retract' : '')
                } playing
                style={{display: 'flex'}}>
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
                <div id={'mini-player-infos'}>
                    <span id={'mp-song-title'}
                          hidden={!this.state.song}>{this.state.song && this.state.song.name}</span>
                    <span id={'mp-song-artist'}
                          hidden={!this.state.song}>{this.state.song && this.state.song.formattedArtists}</span>
                </div>
            </div>
        )
    }
}

export default SongRequestMiniPlayer;
