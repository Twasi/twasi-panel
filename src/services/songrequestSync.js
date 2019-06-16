class SongrequestSync {
  constructor() {
    this.socketAddress = `${window.env.GRAPHQL_URL}songrequest`;

    // Replace to WS url
    this.socketAddress = this.socketAddress.replace('http://', 'ws://');
    this.socketAddress = this.socketAddress.replace('https://', 'wss://');

    this.connect = this.connect.bind(this);
    this.isConnected = this.isConnected.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.sendPing = this.sendPing.bind(this);
    this.sendObject = this.sendObject.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.setTwitchId = this.setTwitchId.bind(this);
  }

  connect() {
    if (this.isConnected()) {
      return;
    }

    SongrequestSync.log(`Connecting to ${this.socketAddress}`);
    this.socket = new WebSocket(this.socketAddress);

    this.socket.addEventListener('modalOpen', this.onOpen);
    this.socket.addEventListener('message', this.onMessage);
  }

  isConnected() {
    return this.socket && this.socket.readyState === this.socket.OPEN;
  }

  onOpen() {
    SongrequestSync.log('Connected!');
    this.sendPing();
    this.sendSelectChannel();

    if (this.onStatus) {
      this.onStatus('connected');
    }

    this.pingId = setInterval(this.sendPing, 2000);
  }

  sendPing() {
    this.latestPing = Date.now();
    this.sendObject({ type: 'ping' });
  }

  sendSelectChannel() {
    this.sendObject({ type: 'selectChannel', channel: this.twitchid });
  }

  requestStatus() {
    if (this.isConnected) {
      this.onStatus('connected');
    } else {
      this.onStatus('disconnected');
    }
  }

  onMessage(msg) {
    SongrequestSync.log(`< ${msg.data}`);
    const parsed = JSON.parse(msg.data);

    switch (parsed.type) {
      case 'pong': {
        // Calculate latest ping
        const ping = Date.now() - this.latestPing;
        if (this.onPing) {
          this.onPing(ping);
        }
        break;
      }
      default: {
        SongrequestSync.log(`Did not find a type for message ${parsed}`);
        break;
      }
    }
  }

  sendObject(obj) {
    SongrequestSync.log(`> ${JSON.stringify(obj)}`);
    this.socket.send(JSON.stringify(obj));
  }

  setTwitchId(twitchid) {
    this.twitchid = twitchid;
  }

  static log(str) {
    // eslint-disable-next-line no-console
    console.log(`[SONGREQUEST_SYNC] ${str}`);
  }
}

const instance = new SongrequestSync();

export default instance;
