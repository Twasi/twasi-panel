import React from 'react';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import SkipArrow from 'material-ui/svg-icons/av/skip-next';
import RevokeArrow from 'material-ui/svg-icons/av/skip-previous';
import Volume from 'material-ui/svg-icons/av/volume-up';
import Slider from 'material-ui/Slider';
import Popover from 'material-ui/Popover';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import SongrequestConnectionStatus from './SongrequestConnectionStatus';
import songrequestSync from '../../services/songrequestSync';

import './_style.css';

class Songrequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      sync: {
        status: 'disconnected',
        ping: -1
      }
    };

    this.sync = songrequestSync;
  }

  componentDidMount() {
    this.sync.connect();

    this.sync.onPing = ping =>
      this.setState({ sync: { ...this.state.sync, ping } });
    this.sync.onStatus = status =>
      this.setState({ sync: { ...this.state.sync, status } });
  }

  handleClick = event => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <div className="pageContent">
        <h2 className="pageTitle songrequestsTitle">
          <FormattedMessage id="sidebar.songrequests" />
          <SongrequestConnectionStatus
            status={this.state.sync.status}
            ping={this.state.sync.ping}
          />
        </h2>
        <Paper
          style={{
            padding: '10px 10px 4px',
            marginBottom: '0px',
            marginTop: '23px',
            backgroundColor: '#6AE368',
            color: '#fff'
          }}
          className="pageContainer"
        >
          <img
            src="https://newsroom.spotify.com/media/mediakit/2018-03-19_22-28-47/Spotify_Logo_RGB_White.png"
            alt="spotify"
            style={{ height: '25px' }}
          />
          <span style={{ float: 'right' }}>
            <a
              style={{ color: '#fff', fontSize: '15px' }}
              href=""
              target="_blank"
            >
              Diesen Song auf Spotify anhören
            </a>
          </span>
        </Paper>
        <Paper
          style={{
            padding: '0px',
            display: 'flex',
            marginTop: '0px',
            marginBottom: '23px'
          }}
          className="pageContainer"
        >
          <div className="songrequestsCoverImage">
            <FloatingActionButton
              style={{
                position: 'absolute',
                marginTop: '50px',
                marginLeft: '50px'
              }}
              backgroundColor="#00aeae"
            >
              <PlayArrow />
            </FloatingActionButton>

            <img
              src="https://images-na.ssl-images-amazon.com/images/I/71M%2BI5aOauL._SY355_.jpg"
              alt="albumcover"
              style={{ height: '150px', width: '150px' }}
            />
          </div>
          <div className="songrequestsPlayer">
            <h4 style={{ padding: '0px', margin: '0px', color: '#525252' }}>
              Bohemian Rhapsody{' '}
              <FloatingActionButton
                style={{
                  marginTop: '0px',
                  marginLeft: '10px',
                  float: 'right',
                  boxShadow: 'none'
                }}
                mini="true"
                backgroundColor="#414358"
              >
                <SkipArrow />
              </FloatingActionButton>
              <FloatingActionButton
                style={{
                  marginTop: '0px',
                  marginLeft: '10px',
                  float: 'right',
                  boxShadow: 'none'
                }}
                mini="true"
                backgroundColor="#414358"
              >
                <RevokeArrow />
              </FloatingActionButton>
              <FloatingActionButton
                onClick={this.handleClick}
                style={{
                  marginTop: '0px',
                  marginLeft: '10px',
                  float: 'right',
                  boxShadow: 'none'
                }}
                mini="true"
                backgroundColor="#00aeae"
              >
                <Volume />
                <Popover
                  open={this.state.open}
                  animated="true"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                  onRequestClose={this.handleRequestClose}
                  style={{
                    height: 'auto',
                    width: 'auto'
                  }}
                >
                  <Slider
                    sliderStyle={{
                      marginLeft: '15px',
                      marginRight: '15px',
                      marginTop: '11px',
                      marginBottom: '11px',
                      width: '150px'
                    }}
                    style={{ color: '#00aeae' }}
                  />
                </Popover>
              </FloatingActionButton>
              <br />
              <small>Queen</small>
              <br />
              <em style={{ fontSize: '12px', fontWeight: 'normal' }}>
                Requestet von <b>John Doe</b>
              </em>
            </h4>
            <Slider
              sliderStyle={{ marginBottom: '0px', marginTop: '10px' }}
              style={{ color: '#00aeae' }}
            />
            <div
              className="songrequestsInfo"
              style={{ color: '#525252', fontWeight: 'bold', fontSize: '14px' }}
            >
              <span className="leftTime">00:00</span>
              <span className="rightTime">13:37</span>
            </div>
          </div>
        </Paper>
        <Table>
          <TableHeader
            adjustForCheckbox={false}
            displaySelectAll={false}
            selectable={false}
          >
            <TableRow className="TableRow">
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Titel</TableHeaderColumn>
              <TableHeaderColumn>Kanal</TableHeaderColumn>
              <TableHeaderColumn>Dauer</TableHeaderColumn>
              <TableHeaderColumn>Requestet von</TableHeaderColumn>
              <TableHeaderColumn>Aktionen</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>Queen - Bohemian Rhapsody</TableRowColumn>
              <TableRowColumn>Queen</TableRowColumn>
              <TableRowColumn>13:37</TableRowColumn>
              <TableRowColumn>John Doe</TableRowColumn>
              <TableRowColumn>Löschen Favorisieren</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Songrequests;
