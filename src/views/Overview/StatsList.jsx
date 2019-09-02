import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import { Row, Col } from 'react-grid-system';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import { streamtrackerSelectors, streamtrackerOperations } from '../../state/streamtracker';

function getStreamLength(data) {
  var startDate = new Date(data[0].timestamp)
  var endDate = new Date(data.slice(-1)[0].timestamp)
  var difference = endDate.getTime() - startDate.getTime()
  const hours = parseInt(Math.abs(difference) / (1000 * 60 * 60) % 24);
  const minutes = parseInt(Math.abs(difference) / (1000 * 60) % 60);
  return hours + "h " + minutes + "m";
}

function getBiggestViewerCount(data) {
  let count = 0;
  data.forEach((entry, index) => {
    if (entry.viewerCount > count) {
      count = entry.viewerCount;
    }
  });
  return count;
}

function getAverageViewerCount(data) {
  const numbers = [];

  data.forEach((entry, index) => {
    numbers.push(entry.viewerCount);
  });

  let total = 0; let
    i;
  for (i = 0; i < numbers.length; i += 1) {
    total += numbers[i];
  }
  return Math.round(total / numbers.length);
}

function getChatMessagesCount(data) {
  let count = 0;
  data.forEach((entry, index) => {
    count += entry.chatMessages;
  });
  return count;
}

function getChatCommandsCount(data) {
  let count = 0;
  data.forEach((entry, index) => {
    count += entry.chatCommands;
  });
  return count;
}

function getChattersCount(data) {
  let count = 0;
  data.forEach((entry, index) => {
    count++;
  });
  return count;
}

class StatsList extends Component {
  render() {
    const { streamtracker } = this.props;
    return (
      <List dense style={{ padding: '0px' }}>
        <Paper className="pageContainer" style={{ padding: '0px', margin: '23px 0px 0px 0px' }}>
          <ListItem style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <Row>
              <Col sm={12}>
                <Typography component={'span'}>
                  <h4 className="pageContainerTitle">{streamtracker.streamId}</h4>
                  <small><FormattedMessage id="overview.table_id" /></small>
                </Typography>
              </Col>
            </Row>
            {/*
            <TooltipM title="Jetzt Live" placement="right">
              <Icon
                color="secondary"
                style={{ position: 'absolute', right: '17px', fontSize: '15px' }}
              >
                brightness_1
              </Icon>
            </TooltipM>
            */}
          </ListItem>
          <Card className="statslistCard pluginCard noshadow">
            <CardContent style={{ padding: '0px', borderRadius: '0px' }}>
              <ListItem style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <Row>
                  <Col sm={12}>
                    <Typography component={'span'}>
                      <h4 className="pageContainerTitle">{getStreamLength(streamtracker.data)}</h4>
                      <small><FormattedMessage id="overview.table_duration" /></small>
                    </Typography>
                  </Col>
                </Row>
                {/*
                <TooltipM title="+ 5:12" placement="right">
                  <Icon
                    color="primary"
                    style={{ position: 'absolute', right: '13px' }}
                  >
                    trending_up
                  </Icon>
                </TooltipM>
                */}
              </ListItem>
            </CardContent>
          </Card>
          <ListItem style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <Row>
              <Col sm={12}>
                <Typography component={'span'}>
                  <h4 className="pageContainerTitle">{getChatMessagesCount(streamtracker.data)}</h4>
                  <small><FormattedMessage id="overview.table_chatmessages" /></small>
                </Typography>
              </Col>
            </Row>
            {/*
            <TooltipM title="+ 125" placement="right">
              <Icon
                color="primary"
                style={{ position: 'absolute', right: '13px' }}
              >
                trending_up
              </Icon>
            </TooltipM>
            */}
          </ListItem>
          <Card className="statslistCard pluginCard noshadow">
            <CardContent style={{ padding: '0px', borderRadius: '0px' }}>
              <ListItem style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <Row>
                  <Col sm={12}>
                    <Typography component={'span'}>
                      <h4 className="pageContainerTitle">{getChatCommandsCount(streamtracker.data)}</h4>
                      <small><FormattedMessage id="overview.table_commands_used" /></small>
                    </Typography>
                  </Col>
                </Row>
                {/*
                <TooltipM title="- 5" placement="right">
                  <Icon
                    color="secondary"
                    style={{ position: 'absolute', right: '13px' }}
                  >
                    trending_down
                  </Icon>
                </TooltipM>
                */}
              </ListItem>
            </CardContent>
          </Card>
          <ListItem style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <Row>
              <Col sm={12}>
                <Typography component={'span'}>
                  <h4 className="pageContainerTitle">{streamtracker.newFollowers}</h4>
                  <small><FormattedMessage id="overview.table_follower" /></small>
                </Typography>
              </Col>
            </Row>
            {/*
            <TooltipM title="+- 0" placement="right">
              <Icon
                style={{ position: 'absolute', right: '13px', color: '#da7720' }}
              >
                trending_flat
              </Icon>
            </TooltipM>
            */}
          </ListItem>
          <Card className="statslistCard pluginCard noshadow">
            <CardContent style={{ padding: '0px', borderRadius: '0px' }}>
              <ListItem style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <Row>
                  <Col sm={12}>
                    <Typography component={'span'}>
                      <h4 className="pageContainerTitle">{streamtracker.newViews}</h4>
                      <small><FormattedMessage id="overview.table_views" /></small>
                    </Typography>
                  </Col>
                </Row>
                {/*
                <TooltipM title="+- 0" placement="right">
                  <Icon
                    style={{ position: 'absolute', right: '13px', color: '#da7720' }}
                  >
                    trending_flat
                  </Icon>
                </TooltipM>
                */}
              </ListItem>
            </CardContent>
          </Card>
          <ListItem style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <Row>
              <Col sm={12}>
                <Typography component={'span'}>
                  <h4 className="pageContainerTitle">{getBiggestViewerCount(streamtracker.data)}</h4>
                  <small><FormattedMessage id="overview.table_viewermax" /></small>
                </Typography>
              </Col>
            </Row>
            {/*
            <TooltipM title="+ 7" placement="right">
              <Icon
                color="primary"
                style={{ position: 'absolute', right: '13px' }}
              >
                trending_up
              </Icon>
            </TooltipM>
            */}
          </ListItem>
          <Card className="statslistCard pluginCard noshadow">
            <CardContent style={{ padding: '0px', borderRadius: '0px' }}>
              <ListItem style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <Row>
                  <Col sm={12}>
                    <Typography component={'span'}>
                      <h4 className="pageContainerTitle">{getAverageViewerCount(streamtracker.data)}</h4>
                      <small><FormattedMessage id="overview.table_average" /></small>
                    </Typography>
                  </Col>
                </Row>
                {/*
                <TooltipM title="- 2" placement="right">
                  <Icon
                    color="secondary"
                    style={{ position: 'absolute', right: '13px' }}
                  >
                    trending_down
                  </Icon>
                </TooltipM>
                */}
              </ListItem>
            </CardContent>
          </Card>
          <ListItem style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <Row>
              <Col sm={12}>
                <Typography component={'span'}>
                  <h4 className="pageContainerTitle">{getChattersCount(streamtracker.topChatters)}</h4>
                  <small><FormattedMessage id="overview.table_individual" /></small>
                </Typography>
              </Col>
            </Row>
            {/*
            <TooltipM title="- 50" placement="right">
              <Icon
                color="secondary"
                style={{ position: 'absolute', right: '13px' }}
              >
                trending_down
              </Icon>
            </TooltipM>
            */}
          </ListItem>
        </Paper>
      </List>
    );
  }
}

StatsList.propTypes = {
  updateStreamtracker: PropTypes.func.isRequired,
  streamtracker: PropTypes.arrayOf(PropTypes.shape({
    streamId: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    startedAt: PropTypes.string.isRequired,
    streamType: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      gameId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      game: PropTypes.string.isRequired,
      viewerCount: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired
    }))
  })),
  disabled: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  streamtracker: streamtrackerSelectors.getStreamtracker(state),
  isLoaded: streamtrackerSelectors.isLoaded(state),
  disabled: streamtrackerSelectors.isDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(streamtrackerOperations.verifyData()),
  updateStreamtracker: () => dispatch(streamtrackerOperations.loadStreamtracker())
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsList);
