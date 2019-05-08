import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import { utilitiesSelectors, utilitiesOperations } from '../../state/utilities';

class GameTitleCard extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { updateUtilities } = this.props;
    updateUtilities();
  }

  render() {
    const { utilities } = this.props;
    if(utilities.retrieve != null){
      var title = utilities.retrieve.title
      var game = utilities.retrieve.game
    }
    return (
      <Card className="pluginCard" style={{ marginTop: '15px' }}>
        <CardContent style={{ padding: '24px' }}>
          <Grid container spacing={16}>
            <Grid item lg={6} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                label={<FormattedMessage id="overview.title" />}
                fullWidth
                value={title}
                margin="normal"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                      >
                        <Icon>
                          save
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item lg={6} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                label={<FormattedMessage id="overview.game" />}
                fullWidth
                value={game}
                margin="normal"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="send-support-message"
                      >
                        <Icon>
                          save
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

GameTitleCard.propTypes = {
  updateUtilities: PropTypes.func.isRequired,
  utilities: PropTypes.arrayOf(PropTypes.shape({
    retrieve: PropTypes.arrayOf(PropTypes.shape({
      game: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })),
  })),
  disabled: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  utilities: utilitiesSelectors.getUtilities(state),
  isLoaded: utilitiesSelectors.isLoaded(state),
  disabled: utilitiesSelectors.isDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(utilitiesOperations.verifyData()),
  updateUtilities: () => dispatch(utilitiesOperations.loadUtilities()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameTitleCard);
