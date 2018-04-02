import React from 'react';
import Paper from 'material-ui/Paper';
import { FormattedMessage } from 'react-intl';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import { Container, Row, Col } from 'react-grid-system';
import Slider from 'material-ui/Slider';

import './_style.css';

class Songrequests extends React.Component {
  render() {
    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="sidebar.songrequests" />
        </h2>
        <Paper style={{ padding: '0px' }} className="pageContainer">
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
            <h4 style={{ padding: '0px', margin: '0px' }}>
              Bohemian Rhapsody <br />
              <small>Queen</small>
            </h4>
            <Slider
              sliderStyle={{ marginBottom: '0px' }}
              style={{ color: '#00aeae' }}
            />
            <div className="songrequestsInfo">
              <span className="leftTime">00:00</span>
              <span className="rightTime">13:37</span>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Songrequests;
