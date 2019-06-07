import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';

import { utilitiesSelectors, utilitiesOperations } from '../../state/utilities';

class GameTitleCard extends Component {
  state = {
    title: '',
    game: '',
    isRendered: false,
    open: false,
  };

  componentDidMount() {
    const { updateUtilities } = this.props;
    updateUtilities();
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value
    });
  };

  handleGameChange = (event) => {
    this.setState({
      game: event.target.value
    });
  };

  handleClick = (event) => {
    this.setState({
      open: true
    });
  };

  handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      open: false
    });
  }

  render() {
    const { utilities } = this.props;
    if(!this.state.isRendered && utilities.retrieve != null) {
      this.setState({
        isRendered: true,
        title: utilities.retrieve.title,
        game: utilities.retrieve.game
      });
    }
    return (
      <Card className="pluginCard" style={{ marginTop: '15px' }}>
        <CardContent style={{ padding: '24px' }}>
          <Grid container spacing={16}>
            <Grid item lg={6} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                label={<FormattedMessage id="overview.title" />}
                fullWidth
                value={this.state.title}
                onChange={this.handleTitleChange}
                margin="normal"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                      onClick={() => {this.props.changeTitleGame(this.state.title, this.state.game); this.handleClick()}}
                      >
                        <Icon>
                          save
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item lg={6} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                label={<FormattedMessage id="overview.game" />}
                fullWidth
                value={this.state.game}
                onChange={this.handleGameChange}
                margin="normal"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {this.props.changeTitleGame(this.state.title, this.state.game); this.handleClick()}}
                      >
                        <Icon>
                          save
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={5000}
          onClose={this.handleClose}
          message={"Der Titel und das Spiel wurden erfolgreich geändert."}
        />
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
    }))
  })),
  disabled: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  utilities: utilitiesSelectors.getUtilities(state),
  isLoaded: utilitiesSelectors.isLoaded(state),
  disabled: utilitiesSelectors.isDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  changeTitleGame: (newTitle, newGame) => dispatch(utilitiesOperations.changeTitleGame(newTitle, newGame)),
  verifyData: () => dispatch(utilitiesOperations.verifyData()),
  updateUtilities: () => dispatch(utilitiesOperations.loadUtilities())
});

export default connect(mapStateToProps, mapDispatchToProps)(GameTitleCard);
