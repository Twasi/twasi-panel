import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import { FormattedMessage, injectIntl } from 'react-intl';

import './_style.css';

import { smartlifeSelectors, smartlifeOperations } from '../../state/integrations/smartlife';

class AddSequenceDialog extends React.Component {

  state = {
    sequenceName: '',
    variableName: '',
    createVariable: false,
    sceneCount: 1,
    sceneOne: 0,
    sceneTwo: 0,
    sceneThree: 0
  };

  componentDidMount() {
    const { updateSmartlifeScenes } = this.props;
    updateSmartlifeScenes(this.props.homeId);
    this.textInput = React.createRef();
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  focusTextInput = () => {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  addSzene = () => {
    this.setState({ sceneCount: this.state.sceneCount+1 });
  }

  removeSzene = () => {
    this.setState({ sceneCount: this.state.sceneCount-1 });
  }

  renderScenes() {
    const { smartlifeScenes } = this.props;
    return smartlifeScenes.scenes.map(scene => (
      <MenuItem key={scene.sceneId} value={scene.name}>{scene.name}</MenuItem>
    ));
  }

  render() {
    const { classes, onClose, smartlifeScenes, ...other } = this.props;
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
          <Card style={{ marginTop: '15px' }} className="pluginCard">
            <CardContent style={{ paddingTop: '0px', paddingBottom: '8px' }}>
              <FormControl style={{ marginTop: '16px' }} variant="outlined" fullWidth>
                <InputLabel
                  htmlFor="scene-select"
                >
                  Szene auswählen
                </InputLabel>
                <Select
                  value={this.state.sceneOne}
                  onChange={this.handleChangeSceneOne}
                  input={
                    <OutlinedInput
                      labelWidth='130'
                      name="sceneOne"
                      id="scene-select"
                    />
                  }
                >
                  {smartlifeScenes.length !== 0 && this.renderScenes()}
                </Select>
                <FormHelperText>Welche Szene soll als erstes ausgelöst werden?</FormHelperText>
              </FormControl>
            </CardContent>
          </Card>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Fab
              disabled={this.state.sceneCount === 1}
              onClick={() => this.removeSzene()}
              style={{ marginTop: '15px', marginRight: '5px' }}
              color="secondary"
              className="noshadow"
              size="small"
              aria-label="removeScene">
              <Icon className="actionButtons">remove</Icon>
            </Fab>
            <Fab
              disabled={this.state.sceneCount >= 3 || smartlifeScenes.scenes && smartlifeScenes.scenes.length === this.state.sceneCount}
              onClick={() => this.addSzene()}
              style={{ marginTop: '15px' }}
              color="primary"
              className="noshadow"
              size="small"
              aria-label="addScene">
              <Icon className="actionButtons">add</Icon>
            </Fab>
          </div>
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
});

const mapDispatchToProps = dispatch => ({
  updateSmartlifeScenes: (homeId) => dispatch(smartlifeOperations.loadSmartlifeScenes(homeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSequenceDialog);
