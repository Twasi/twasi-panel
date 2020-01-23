import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Chip from '@material-ui/core/Chip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { FormattedMessage, injectIntl } from 'react-intl';

import './_style.css';

import { smartlifeSelectors, smartlifeOperations } from '../../state/integrations/smartlife';

var usedScenes = [];

class AddSequenceDialog extends React.Component {

  state = {
    sequenceName: '',
    variableName: '',
    createVariable: false,
    sceneCount: 1
  };

  componentDidMount() {
    const {updateSmartlifeMaxSteps,updateSmartlifeScenes,homes} = this.props;
    updateSmartlifeMaxSteps();
    updateSmartlifeScenes(homes[0].homeId)
    for(var i = 0; i <= this.state.sceneCount; i++) {
      this.setState({ ['group'+i]: homes[0].homeId })
    }
    this.textInput = React.createRef();
  }

  handleClose = () => {
    this.props.onClose();
  };

  focusTextInput = () => {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  addScene = () => {
    this.setState({ sceneCount: this.state.sceneCount+1 });
  }

  removeScene = () => {
    this.setState({ sceneCount: this.state.sceneCount-1 });
  }

  renderGroups() {
    const { homes } = this.props;
    return homes.map(home => (
      <MenuItem key={home.homeId} value={home.homeId}>{home.name}</MenuItem>
    ));
  }

  renderScenes(scenes) {
    if(scenes.scenes != undefined) {
      return scenes.scenes.map(scene => (
        <MenuItem key={scene.sceneId} value={scene.sceneId}>{scene.name}</MenuItem>
      ));
    }
  }

  renderSceneCreator() {
    const { homes, smartlifeMaxSteps, disabled, updateSmartlifeScenes, smartlifeScenes, isActionSuccess } = this.props;
    return (
      <div>
        {_.times(this.state.sceneCount, i =>
          <div>
            <Card className="pluginCard" style={{ marginTop: '15px' }}>
              <CardContent style={{ paddingTop: '0px', paddingBottom: '8px' }}>
                <Typography style={{ paddingTop: '8px', paddingLeft: '12px', fontSize: '0.775rem' }}>Delay für Szene {i+1}: {this.state['delay'+i]}</Typography>
                <Slider
                  style={{ padding: '22px 0px' }}
                  aria-labelledby="label"
                  value={this.state['delay'+i]}
                  min={0}
                  max={59}
                  step={1}
                  onChange={(event, delay) => this.setState({ ['delay'+i]: delay })}
                />
                <Typography style={{ paddingLeft: '12px', fontSize: '0.775rem' }}>Stelle hier ein gewünschtes Delay ein.</Typography>
              </CardContent>
            </Card>
            <Card style={{ marginTop: '15px' }} className="pluginCard">
              <CardContent>
                <Typography>
                  <b>Szene {i+1}</b>
                </Typography>
                {homes.length !== 1 &&
                <FormControl style={{ marginTop: '16px' }} variant="outlined" fullWidth>
                  <InputLabel
                    htmlFor="group-select"
                  >
                    Gruppe auswählen
                  </InputLabel>
                  <Select
                    value={this.state['group'+i]}
                    onChange={(event) => this.setState({ ['group'+i]: event.target.value })}
                    input={
                      <OutlinedInput
                        labelWidth='130'
                        name={i}
                        id="group-select"
                      />
                    }
                  >
                    {!disabled && this.renderGroups()}
                  </Select>
                </FormControl>}
                <Grid container spacing={3}>
                  <Grid item xs={10} style={{ borderRadius: '50px' }}>
                    <FormControl style={{ marginTop: '16px' }} variant="outlined" fullWidth>
                      <InputLabel
                        htmlFor="scene-select"
                      >
                        Szene auswählen
                      </InputLabel>
                      <Select
                        value={this.state['scene'+i]}
                        onChange={(event) => this.setState({ ['scene'+i]: event.target.value })}
                        onOpen={!disabled && homes.length === 1 ? () => updateSmartlifeScenes(homes[0].homeId) : () => updateSmartlifeScenes(this.state['group'+i])}
                        input={
                          <OutlinedInput
                            labelWidth='130'
                            value={this.state['scene'+i]}
                            id="scene-select"
                          />
                        }
                      >
                        {smartlifeScenes && this.renderScenes(smartlifeScenes)}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2} style={{ borderRadius: '50px' }}>
                    <Fab
                      style={{ marginTop: '15px' }}
                      color="primary"
                      className="noshadow"
                      aria-label="playScene">
                      <Icon className="actionButtons">play_arrow</Icon>
                    </Fab>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        )}
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Fab
            disabled={this.state.sceneCount === 1}
            onClick={() => this.removeScene()}
            style={{ marginTop: '15px', marginRight: '5px' }}
            color="secondary"
            className="noshadow"
            size="small"
            aria-label="removeScene">
            <Icon className="actionButtons">remove</Icon>
          </Fab>
          <Fab
            disabled={this.state.sceneCount >= smartlifeMaxSteps || smartlifeScenes.scenes && smartlifeScenes.scenes.length === this.state.sceneCount}
            onClick={() => this.addScene()}
            style={{ marginTop: '15px' }}
            color="primary"
            className="noshadow"
            size="small"
            aria-label="addScene">
            <Icon className="actionButtons">add</Icon>
          </Fab>
        </div>
      </div>
    )
  }

  render() {
    console.log(this.state['scene0'])
    const { classes, onClose, smartlifeScenes, smartlifeMaxSteps, disabled, isLoaded, isLoading, isActionSuccess, updateSmartlifeScenes, updateSmartlifeMaxSteps, homes, ...other } = this.props;
    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
        scroll="body"
      >
        <DialogContent>
          <Typography>
            <h4 className="pageContainerTitle">
              Neue Sequenz erstellen
            </h4>
            <small>
              Hier kannst du eine neue Sequenz erstellen.
              <br/>Sequenzen sind Aneinanderreihungen von Smartlife Szenen, die durch Events oder durch eine Chatvariable ausgelöst werden können.
            </small>
          </Typography>
          <br /><br />
          <Card className="pluginCard">
            <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-textarea"
                label='Name der Sequenz'
                fullWidth
                autoFocus
                inputRef={this.textInput}
                value={this.state.sequenceName}
                onChange={this.handleSequenceNameChange}
                helperText="Wie soll deine Sequenz heißen?"
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
          <Card style={{ marginTop: '15px' }} className="pluginCard">
            <CardContent style={{ paddingTop: '10px', paddingBottom: '0px' }}>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={this.state.createVariable}
                    onChange={this.handleChange('createVariable')}
                    value="createVariable" />
                }
                label="Variable für diese Sequenz erstellen?"
              />
              <TextField
                disabled={!this.state.createVariable}
                InputLabelProps={{ shrink: true }}
                id="outlined-textarea"
                label='Name der Variable'
                fullWidth
                autoFocus
                inputRef={this.textInput}
                value={this.state.variableName}
                onChange={this.handleVariableNameChange}
                helperText="Die Variable kann in Befehlen genutzt werden, um diese Sequenz zu starten."
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
          {this.renderSceneCreator()}
          <Button
            disabled
            fullWidth
            style={{ marginTop: '15px' }}
            variant="contained"
            color="primary">
            Sequenz speichern
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  smartlifeScenes: smartlifeSelectors.getSmartlifeScenes(state),
  smartlifeMaxSteps: smartlifeSelectors.getSmartlifeMaxSteps(state),
  isLoaded: smartlifeSelectors.isLoaded(state),
  isLoading: smartlifeSelectors.isLoading(state),
  isActionSuccess: smartlifeSelectors.isActionSuccess(state),
  disabled: smartlifeSelectors.isDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  updateSmartlifeScenes: (homeId) => dispatch(smartlifeOperations.loadSmartlifeScenes(homeId)),
  updateSmartlifeMaxSteps: () => dispatch(smartlifeOperations.loadSmartlifeMaxSteps()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSequenceDialog);
