class LocalTSRIEventDistributor {
    constructor() {
        this.eventCache = new Map();
        this.handlers = [];
        const fire = (state, details = undefined) => {
            this.eventCache.set(state, details);
            this.handlers
                .filter(h => h.state === state)
                .map(h => h.changeHandler)
                .forEach(callback => {
                    try {
                        callback(details);
                    } catch (e) {
                    }
                })
        };
        this.fire = fire;
        this.TSRIEvents = {
            play: () => {
                fire("playState", true);
            },
            pause: () => {
                fire("playState", false)
            },
            stop: () => {
                fire("playState", false)
            },
            initialized: status => {
                fire("status", status);
            },
            position: pos => {
                fire("position", {pos, formattedPos: this.formatPosition(pos)});
            },
            song: song => {
                this.duration = (song ? song.duration : 0);
                if (song) {
                    song.formattedArtists = this.formatArtists(song.artists);
                    song.formattedMaxPos = this.formatPosition();
                }
                fire("song", song);
            },
            enableSpotifyAuth: enable => {
                fire("spotifyAuth", enable);
            },
            queueUpdate: (queue, history) => {
                console.log(queue);
                queue.forEach(e => e.formattedMaxPos = this.formatPosition(1, e.duration));
                fire("queue", {queue, history});
            },
            settingsUpdate: settings => {
                fire("settings", settings);
            }
        };
    }

    onChange(state, changeHandler, origin = undefined) {
        if (origin) this.handlers = this.handlers.filter(h => !(h.origin === origin && h.state === state));
        this.handlers.push({state, changeHandler, origin});
        if (this.eventCache.has(state))
            changeHandler(this.eventCache.get(state));
    }

    formatPosition(pos = 1, duration = undefined) {
        if (pos === 0) return "0:00";
        let sec = (duration ? duration : this.duration) / 1000 * pos;
        let min = sec / 60;
        sec = sec % 60;
        if (sec < 10) sec = "0" + Math.floor(sec);
        else sec = Math.floor(sec);
        return Math.floor(min) + ":" + sec;
    }

    formatArtists(artists) {
        let features = [...artists];
        features.shift();
        if (features.length)
            features = ' feat. ' + features.join(' & ');
        return artists[0] + features;
    }
}

class LocalTSRIManager {
    constructor() {
        this.unlisten = null;
        this.eventDistributor = new LocalTSRIEventDistributor();
    }
}

window.TSRI.local = {manager: new LocalTSRIManager()};
