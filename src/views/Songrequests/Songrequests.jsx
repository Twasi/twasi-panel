import React from 'react';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import SkipArrow from 'material-ui/svg-icons/av/skip-next';
import RevokeArrow from 'material-ui/svg-icons/av/skip-previous';
import Volume from 'material-ui/svg-icons/av/volume-up';
import { Container, Row, Col } from 'react-grid-system';
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

import './_style.css';

class Songrequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
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
        <h2 className="pageTitle">
          <FormattedMessage id="sidebar.songrequests" />
        </h2>
        <Paper
          style={{ padding: '0px', display: 'flex' }}
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
                  animated="false"
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
        <Paper
          style={{
            padding: '8px',
            paddingTop: '11px',
            marginBottom: '32px',
            marginTop: '0px',
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
          <span style={{ float: 'right', marginTop: '3px' }}>
            Dieser Song wird zur Verfügung gestellt durch Spotify
          </span>
        </Paper>
        <Table>
          <TableHeader
            className="songrequestsTableHead"
            adjustForCheckbox={false}
            displaySelectAll={false}
            selectable={false}
          >
            <TableRow className="songrequestsTableRow">
              <TableHeaderColumn className="songrequestsTableColumn">
                ID
              </TableHeaderColumn>
              <TableHeaderColumn className="songrequestsTableColumn">
                Titel
              </TableHeaderColumn>
              <TableHeaderColumn className="songrequestsTableColumn">
                Kanal
              </TableHeaderColumn>
              <TableHeaderColumn className="songrequestsTableColumn">
                Dauer
              </TableHeaderColumn>
              <TableHeaderColumn className="songrequestsTableColumn">
                Requestet von
              </TableHeaderColumn>
              <TableHeaderColumn className="songrequestsTableColumn">
                Aktionen
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            className="songrequestsTableBody"
            displayRowCheckbox={false}
          >
            <TableRow>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Songrequests;
