import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-grid-system';
import { connect } from 'react-redux';

import { streamtrackerSelectors } from '../../state/streamtracker';

import ViewerChart from './ViewerChart';
import StatsList from './StatsList';
import PlayedGamesChart from './PlayedGamesChart';
import ChattersChart from './ChattersChart';

class StreamByID extends Component {

  addZero= (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  formatTime = (timestamp) => {
    var date = new Date(timestamp);
    var day = this.addZero(date.getDate());
    var month = this.addZero(date.getMonth()+1);
    var year = date.getFullYear();
    var hours = this.addZero(date.getHours());
    var minutes = this.addZero(date.getMinutes());
    return day+"."+month+"."+year+" - "+hours+":"+minutes;
  }

  getLength = (data) => {
    data.map(key => (
      console.log(key)
    ));
  }

  render() {
    const { streamById, isStreamByIDLoading } = this.props;
    if(!isStreamByIDLoading) {
      return (
        <div>
          <Paper className="pageContainer">
            <Typography component={'span'}>
              <h4 className="pageContainerTitle">
                Stream mit der ID {streamById.streamId}
              </h4>
              <small>
                gestartet am {this.formatTime(streamById.startedAt)}
              </small>
            </Typography>
          </Paper>
          <Row>
            <Col sm={9}>
              <Paper className="pageContainer" style={{ height: '300px', paddingRight: '0px', paddingLeft: '0px', paddingBottom: '0px' }}>
                <Typography component={'span'} style={{ paddingLeft: '23px', position: 'absolute' }}>
                  <h4 className="pageContainerTitle">
                    <FormattedMessage id="overview.viewercourse" />
                  </h4>
                  <small>
                    <FormattedMessage id="overview.viewercourse.past.subtitle" />
                  </small>
                </Typography>
                <ViewerChart streamdata={streamById}/>
              </Paper>
              <Row>
                <Col sm={12}>
                  <Paper className="pageContainer" style={{ height: '350px', padding: '23px 0px 0px 0px' }}>
                    <Typography component={'span'} style={{ paddingLeft: '23px', position: 'absolute' }}>
                      <h4 className="pageContainerTitle">
                        <FormattedMessage id="overview.played_games" />
                      </h4>
                      <small>
                        <FormattedMessage id="overview.played_games.past.subtitle" />
                      </small>
                    </Typography>
                    <PlayedGamesChart streamdata={streamById}/>
                  </Paper>
                </Col>
              </Row>
              <Paper className="pageContainer" style={{ height: '500px', paddingRight: '0px', paddingLeft: '0px', paddingBottom: '0px' }}>
                <Typography component={'span'} style={{ paddingLeft: '23px', position: 'absolute' }}>
                  <h4 className="pageContainerTitle">
                    <FormattedMessage id="overview.chatterchart" />
                  </h4>
                  <small>
                    <FormattedMessage id="overview.chatterchart.past.subtitle" />
                  </small>
                </Typography>
                <ChattersChart streamdata={streamById}/>
              </Paper>
            </Col>
            <Col sm={3}>
              <StatsList streamdata={streamById}/>
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div>
          <Paper className="pageContainer">
            <Typography component={'span'}>
              <h4 className="pageContainerTitle">
                Loading...
              </h4>
            </Typography>
          </Paper>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  streamById: streamtrackerSelectors.getStreamById(state),
  isStreamByIDLoading: streamtrackerSelectors.isStreamByIDLoading(state),
});


export default connect(mapStateToProps)(StreamByID);
