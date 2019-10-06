import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import { Row, Col } from 'react-grid-system';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import { streamtrackerSelectors, streamtrackerOperations } from '../../state/streamtracker';

class StreamByID extends Component {
  render() {
    const { streamId } = this.props;
    return (
      <Paper className="pageContainer">
        <Typography component={'span'}>
          <h4 className="pageContainerTitle">
            {streamId}
          </h4>
          <small>
            Lade Streamdaten...
          </small>
        </Typography>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(StreamByID);
