import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import { Container, Row, Col } from 'react-grid-system';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TooltipM from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Badge from '@material-ui/core/Badge';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { streamtrackerSelectors, streamtrackerOperations } from '../../state/streamtracker';

function getStreamLength(data) {
  var time = parseInt(data.length)
  var hour = time / 60;
  var rhour = Math.floor(hour);
  var min = (hour - rhour) * 60;
  var rmin = Math.floor(min);
  return rhour + "h " + rmin + "min";
}

function getBiggestViewerCount(data) {
  var count = 0;
  data.forEach((entry, index) => {
    if(entry.viewerCount > count){
      count = entry.viewerCount
    }
  });
  return count;
}

function getAverageViewerCount(data) {
    var numbers = [];

    data.forEach((entry, index) => {
      numbers.push(entry.viewerCount)
    });

    var total = 0, i;
    for (i = 0; i < numbers.length; i += 1) {
        total += numbers[i];
    }
    return Math.round(total / numbers.length);
}

function getChatMessagesCount(data) {
  var count = 0;
  data.forEach((entry, index) => {
    count += entry.chatMessages
  });
  return count;
}

function getChatCommandsCount(data) {
  var count = 0;
  data.forEach((entry, index) => {
    count += entry.chatCommands
  });
  return count;
}

function getChattersCount(data) {
  var count = 0;
  data.forEach((entry, index) => {
    count++
  });
  return count;
}

class StatsList extends Component {
  render() {
    const { streamtracker } = this.props;
    return (
      <List dense style={{ padding: '0px' }}>
        <Paper className="pageContainer" style={{ padding: '0px', margin: '23px 0px 0px 0px' }}>
          <ListItem>
            <Row>
              <Col sm={12}>
                <Typography>
                  <h3 className="pageContainerTitle">{streamtracker.streamId}</h3>
                  <small><FormattedMessage id="overview.table_id" /></small>
                </Typography>
              </Col>
            </Row>
            <TooltipM title="Jetzt Live" placement="right">
              <Icon
                color="secondary"
                style={{ position: 'absolute', right: '17px', fontSize: '15px' }}
              >
                brightness_1
              </Icon>
            </TooltipM>
          </ListItem>
          <Card className="pluginCard noshadow" style={{ borderRadius: '0px' }}>
            <CardContent style={{ padding: '0px' }}>
              <ListItem>
                <Row>
                  <Col sm={12}>
                    <Typography>
                      <h3 className="pageContainerTitle">{getStreamLength(streamtracker.data)}</h3>
                      <small><FormattedMessage id="overview.table_duration" /></small>
                    </Typography>
                  </Col>
                </Row>
                <TooltipM title="+ 5:12" placement="right">
                  <Icon
                    color="primary"
                    style={{ position: 'absolute', right: '13px' }}
                  >
                    trending_up
                  </Icon>
                </TooltipM>
              </ListItem>
            </CardContent>
          </Card>
          <ListItem>
            <Row>
              <Col sm={12}>
                <Typography>
                  <h3 className="pageContainerTitle">{getChatMessagesCount(streamtracker.data)}</h3>
                  <small><FormattedMessage id="overview.table_chatmessages" /></small>
                </Typography>
              </Col>
            </Row>
            <TooltipM title="+ 125" placement="right">
              <Icon
                color="primary"
                style={{ position: 'absolute', right: '13px' }}
              >
                trending_up
              </Icon>
            </TooltipM>
          </ListItem>
          <Card className="pluginCard noshadow" style={{ borderRadius: '0px' }}>
            <CardContent style={{ padding: '0px' }}>
              <ListItem>
                <Row>
                  <Col sm={12}>
                    <Typography>
                      <h3 className="pageContainerTitle">{getChatCommandsCount(streamtracker.data)}</h3>
                      <small><FormattedMessage id="overview.table_commands_used" /></small>
                    </Typography>
                  </Col>
                </Row>
                <TooltipM title="- 5" placement="right">
                  <Icon
                    color="secondary"
                    style={{ position: 'absolute', right: '13px' }}
                  >
                    trending_down
                  </Icon>
                </TooltipM>
              </ListItem>
            </CardContent>
          </Card>
          <ListItem>
            <Row>
              <Col sm={12}>
                <Typography>
                  <h3 className="pageContainerTitle">{streamtracker.newFollowers}</h3>
                  <small><FormattedMessage id="overview.table_follower" /></small>
                </Typography>
              </Col>
            </Row>
            <TooltipM title="+- 0" placement="right">
              <Icon
                style={{ position: 'absolute', right: '13px', color: '#da7720' }}
              >
                trending_flat
              </Icon>
            </TooltipM>
          </ListItem>
          <Card className="pluginCard noshadow" style={{ borderRadius: '0px' }}>
            <CardContent style={{ padding: '0px' }}>
              <ListItem>
                <Row>
                  <Col sm={12}>
                    <Typography>
                      <h3 className="pageContainerTitle">{streamtracker.newViews}</h3>
                      <small><FormattedMessage id="overview.table_views" /></small>
                    </Typography>
                  </Col>
                </Row>
                <TooltipM title="+- 0" placement="right">
                  <Icon
                    style={{ position: 'absolute', right: '13px', color: '#da7720' }}
                  >
                    trending_flat
                  </Icon>
                </TooltipM>
              </ListItem>
            </CardContent>
          </Card>
          <ListItem>
            <Row>
              <Col sm={12}>
                <Typography>
                  <h3 className="pageContainerTitle">{getBiggestViewerCount(streamtracker.data)}</h3>
                  <small><FormattedMessage id="overview.table_viewermax" /></small>
                </Typography>
              </Col>
            </Row>
            <TooltipM title="+ 7" placement="right">
              <Icon
                color="primary"
                style={{ position: 'absolute', right: '13px' }}
              >
                trending_up
              </Icon>
            </TooltipM>
          </ListItem>
          <Card className="pluginCard noshadow" style={{ borderRadius: '0px' }}>
            <CardContent style={{ padding: '0px' }}>
              <ListItem>
                <Row>
                  <Col sm={12}>
                    <Typography>
                      <h3 className="pageContainerTitle">{getAverageViewerCount(streamtracker.data)}</h3>
                      <small><FormattedMessage id="overview.table_average" /></small>
                    </Typography>
                  </Col>
                </Row>
                <TooltipM title="- 2" placement="right">
                  <Icon
                    color="secondary"
                    style={{ position: 'absolute', right: '13px' }}
                  >
                    trending_down
                  </Icon>
                </TooltipM>
              </ListItem>
            </CardContent>
          </Card>
          <ListItem>
            <Row>
              <Col sm={12}>
                <Typography>
                  <h3 className="pageContainerTitle">{getChattersCount(streamtracker.topChatters)}</h3>
                  <small><FormattedMessage id="overview.table_individual" /></small>
                </Typography>
              </Col>
            </Row>
            <TooltipM title="- 50" placement="right">
              <Icon
                color="secondary"
                style={{ position: 'absolute', right: '13px' }}
              >
                trending_down
              </Icon>
            </TooltipM>
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
    })),
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
