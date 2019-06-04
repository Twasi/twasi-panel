import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import Chip from '@material-ui/core/Chip';
import { authSelectors } from '../../../state/auth';

class Rank extends Component {
  render() {
    const { rank } = this.props;
    return (
      <div>
        <Typography>
          {(() => {
            switch (rank) {
              case 'TEAM': return 'Teammitglied';
              case 'PARTNER': return 'Partnerstreamer';
              case 'STREAMER': return 'Streamer';
              default: return 'Unknown';
            }
          })()}
        </Typography>
      </div>
    );
  }
}

Rank.propTypes = {
  rank: PropTypes.string
};

Rank.defaultProps = {
  rank: 'Unknown'
};

const mapStateToProps = state => ({
  rank: authSelectors.getUser(state).rank
});

export default connect(mapStateToProps)(Rank);
