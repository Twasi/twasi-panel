var enableLogging = true;

class SongrequestSync {
  constructor() {
    this.socketAddress = `ws://srv-01.twasi.net:8090`;

    // Replace to WS url
    //this.socketAddress = this.socketAddress.replace('http://', 'ws://');
    //this.socketAddress = this.socketAddress.replace('https://', 'wss://');

    this.connect = this.connect.bind(this);
    this.isConnected = this.isConnected.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.sendObject = this.sendObject.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.setTwitchId = this.setTwitchId.bind(this);
    this.setJwtToken = this.setJwtToken.bind(this);
  }

  connect() {
    if (this.isConnected()) {
      return;
    }

    SongrequestSync.log(`Connecting to ${this.socketAddress}`);
    this.socket = new WebSocket(this.socketAddress);

    this.socket.addEventListener('open', this.onOpen);
    this.socket.addEventListener('message', this.onMessage);
  }

  isConnected() {
    return this.socket && this.socket.readyState === this.socket.OPEN;
  }

  onOpen() {
    SongrequestSync.log('Connected!');
    this.sendAuthentication()
    if (this.onStatus) {
      this.onStatus('connected');
    }
  }

  sendAuthentication() {
    this.sendObject({ ref: this.twitchid, topic: 'auth', scope: 'action', action: { type: 'JWT_TOKEN', token: this.jwt }});
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
      case 'keepalive': {
        this.onKeepalive(parsed.timestamp)
        //SongrequestSync.log(`Keepalive recieved at ${parsed.timestamp}`);
        break;
      }
      case 'shutdown': {
        //SongrequestSync.log(`Core shutdown revieved. Reason: ${parsed.reason}`);
        break;
      }
      default: {
        //SongrequestSync.log(`Did not find a type for message ${parsed}`);
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

  setJwtToken(jwt) {
    this.jwt = jwt;
  }

  static log(str) {
    // eslint-disable-next-line no-console
    if(enableLogging)
    console.log(`[SONGREQUEST_SYNC] ${str}`);
  }
}

const instance = new SongrequestSync();

export default instance;
