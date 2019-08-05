import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
import Fab from '@material-ui/core/Fab';

import { utilitiesSelectors, utilitiesOperations } from '../../state/utilities';

class GameTitleCard extends Component {
  state = {
    title: '',
    game: '',
    open: false,
  };

  componentDidMount() {
    const { updateUtilities } = this.props;
    updateUtilities();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState === this.state && this.props.utilities && this.props.utilities.retrieve) {
      this.setState({
        title: this.props.utilities.retrieve.title,
        game: this.props.utilities.retrieve.game
      });
    }
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
      modalOpen: true
    });
  };

  handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      modalOpen: false
    });
  }

  render() {
    return (
      <Card className="pluginCard" style={{ marginTop: '15px' }}>
        <CardContent style={{ padding: '24px' }}>
          <Grid container spacing={2}>
            <Grid item sm={7} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                label={<FormattedMessage id="overview.title" />}
                fullWidth
                value={this.state.title}
                onChange={this.handleTitleChange}
                margin="normal"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item sm={4} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                label={<FormattedMessage id="overview.game" />}
                fullWidth
                value={this.state.game}
                onChange={this.handleGameChange}
                margin="normal"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item sm={1} style={{ paddingTop: '15px' }}>
              <Fab
                variant="contained"
                color="primary"
                size="large"
                style={{ height: '56px', borderRadius: '50px' }}
                onClick={() => {this.props.changeTitleGame(this.state.title, this.state.game); this.handleClick()}}
              >
                <Icon>
                  save
                </Icon>
              </Fab>
            </Grid>
          </Grid>
        </CardContent>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.modalOpen}
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
