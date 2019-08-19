import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { authSelectors } from '../../../state/auth';

class Rank extends Component {
  render() {
    const { rank } = this.props;
    return (
      <div>
        {(() => {
          switch (rank) {
            case 'TEAM': return <FormattedMessage id="rank.team" />;
            case 'PARTNER': return <FormattedMessage id="rank.partner" />;
            case 'STREAMER': return <FormattedMessage id="rank.streamer" />;
            default: return 'Unknown';
          }
        })()}
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
