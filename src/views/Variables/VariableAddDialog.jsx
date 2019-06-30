import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Chip from '@material-ui/core/Chip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormattedMessage } from 'react-intl';

import { variablesSelectors, variablesOperations } from '../../state/variables';

class Variable extends React.Component {

  state = {
    variableName: "",
    variableOutput: "",
    openNotification: false,
    notification: ''
  };

  componentDidMount() {
    const { updateVariables } = this.props;
    updateVariables();
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  handleOpenNotification = variableName => {
    this.setState({
      openNotification: true,
      modalOpen: false,
      notification: 'Die Variable "' + variableName + '" wurde erfolgreich erstellt.'
    });
    setTimeout(function() {
        this.props.updateVariables()
    }.bind(this), 100)
  };

  handleCloseNotification = () => {
    this.setState({ openNotification: false });
  };

  handleVariableNameChange = (event) => {
    this.setState({
      variableName: event.target.value
    });
  };

  handleVariableOutputChange = (event) => {
    this.setState({
      variableOutput: event.target.value
    });
  };

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  clearTextInput() {
    this.setState({
      variableName: "",
      variableOutput: ""
    });
  }

  render() {
    const { classes, onClose, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
      >
        <DialogContent>
          <Typography>
            <h3 className="pageContainerTitle">
              <FormattedMessage id="variables.new_variable" />
            </h3>
            <small>
              <FormattedMessage id="variables.new_variable.subheadline" />
            </small>
          </Typography>
          <br /><br />
          <Card className="pluginCard">
            <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-textarea"
                label={<FormattedMessage id="commands.new_command.command" />}
                fullWidth
                autoFocus
                inputRef={this.textInput}
                value={this.state.variableName}
                onChange={this.handleVariableNameChange}
                placeholder="Beispiel: $teamspeak"
                helperText="Das ist deine Variable."
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-textarea"
                label={<FormattedMessage id="commands.new_command.output" />}
                fullWidth
                inputRef={this.textInput}
                value={this.state.variableOutput}
                onChange={this.handleVariableOutputChange}
                placeholder="Beispiel: Teamspeak IP: 127.0.0.1"
                multiline
                rows="3"
                helperText="Das ist die Ausgabe deiner Variable."
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
          <Button
            fullWidth
            style={{ borderRadius: '4px', marginTop: '15px' }}
            variant="contained"
            color="primary"
            onClick={() => {
                this.props.addVariable(this.state.variableName, this.state.variableOutput);
                this.handleOpenNotification(this.state.variableName)
                this.clearTextInput()
            }}>
            <FormattedMessage id="variables.new_variable.savevariable" />
          </Button>
        </DialogContent>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openNotification}
          autoHideDuration={5000}
          onClose={this.handleCloseNotification}
          message={this.state.notification}
        />
      </Dialog>
    );
  }
}

Variable.propTypes = {
  addVariable: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  variables: variablesSelectors.getVariables(state),
  isLoaded: variablesSelectors.isLoaded(state),
  disabled: variablesSelectors.isDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  updateVariables: () => dispatch(variablesOperations.loadVariables()),
  addVariable: (name, output) => dispatch(variablesOperations.addVariable(name, output)),
  verifyData: () => dispatch(variablesOperations.verifyData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Variable);
