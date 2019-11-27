import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Row, Col } from 'react-grid-system';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Slider from '@material-ui/core/Slider';

class SongrequestSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      songs_per_user: 15,
    };
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleTabChange = (event, tabValue) => {
    this.setState({
      tabValue,
    });
  };

  handleSongsPerUser = (event, songs_per_user) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ songs_per_user });
  };

  render() {
    const { classes, onClose, ...other } = this.props;
    return (
      <Dialog
        onClose={this.handleClose}
        scroll="body"
        {...other}
      >
        <Tabs
          value={this.state.tabValue}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Einstellungen" />
          <Tab label="Gesperrte Songs" />
          <Tab label="Gesperrte Nutzer" />
        </Tabs>
        <DialogContent>
          <Typography component={"div"}>
            <h4 className="pageContainerTitle">
              Einstellungen
            </h4>
            <small>
              Hier kannst du Einstellungen zu den Songrequests vornehmen.
            </small>
          </Typography>
          <Card style={{ marginTop: '25px' }} className="pluginCard">
            <CardContent className="pluginCardContent anim">
              <Row>
                <Col style={{ textAlign: 'left' }} sm={8}>
                  <Typography component={"div"}>
                    <h4 className="pageContainerTitle">
                      Songwünsche über Spotify
                    </h4>
                    <small>
                      Um Songwünsche über Spotify zu aktivieren, musst du deinen Spotify Account mit Twasi verbinden.
                    </small>
                  </Typography>
                </Col>
                <Col style={{ textAlign: 'right' }} sm={4}>
                  <Switch checked={true} color="primary" />
                </Col>
              </Row>
              <br/>
              <Row>
                <Col sm={12}>
                  <Button color="primary" variant="contained">
                    Spotify Account verbinden
                  </Button>
                </Col>
              </Row>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '25px' }} className="pluginCard">
            <CardContent className="pluginCardContent anim">
              <Row>
                <Col style={{ textAlign: 'left' }} sm={8}>
                  <Typography component={"div"}>
                    <h4 className="pageContainerTitle">
                      Songwünsche über Youtube
                    </h4>
                    <small>
                      Aktiviere diese Funktion, um Songwünsche über Youtube zuzulassen.
                    </small>
                  </Typography>
                </Col>
                <Col style={{ textAlign: 'right' }} sm={4}>
                  <Switch checked={true} color="primary" />
                </Col>
              </Row>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '25px' }} className="pluginCard">
            <CardContent className="pluginCardContent anim">
              <Row>
                <Col style={{ textAlign: 'left' }} sm={12}>
                  <Typography component={"div"}>
                    <h4 className="pageContainerTitle">Songwünsche pro Nutzer: {this.state.songs_per_user}</h4>
                  </Typography>
                  <Slider
                    style={{ padding: '22px 0px' }}
                    aria-labelledby="label"
                    value={this.state.songs_per_user}
                    min={0}
                    max={100}
                    step={1}
                    onChange={this.handleSongsPerUser}
                  />
                  <Typography>
                    <small>Wie viele Songs darf sich jeder Nutzer wünschen?</small>
                  </Typography>
                </Col>
              </Row>
            </CardContent>
          </Card>
          <br />
          Wir ermöglichen die Wiedergabe von Songrequests über den Spotify Musikdienst und über YouTube.
          Bitte beachte, dass die Wiedergabe nicht-eigener Werke im eigenen Livestream eine Copyrightverletzung darstellen kann,
          solange nicht die entsprechenden Lizenzen eingeholt wurden.
          Bei Nichtwissen über die Rechtslage empfehlen wir, auf die Songrequest-Funktion zu verzichten.
          Twasi bzw. das Twasi Team haftet nicht für Verletzungen des Urheberrechts.
        </DialogContent>
      </Dialog>
    );
  }
}

export default SongrequestSettings;
