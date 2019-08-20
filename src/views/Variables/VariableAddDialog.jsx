import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FormattedMessage } from 'react-intl';

import { variablesSelectors, variablesOperations } from '../../state/variables';

class Variable extends React.Component {

  state = {
    variableName: "",
    variableOutput: "",
    openNotification: false,
    notification: ""
  };

  componentDidMount() {
    this.textInput = React.createRef();
  }

  handleOpenNotification = variableName => {
    this.setState({
      openNotification: true,
      modalOpen: false,
      notification: 'Die Variable "' + variableName + '" wurde erfolgreich erstellt.'
    });
  };

  handleCloseNotification = () => {
    this.setState({ openNotification: false });
  };

  handleVariableNameChange = (event) => {
    var name = event.target.value
    if (event.target.value.slice(0,1) === "$") {
      name = event.target.value.substr(1)
    }
    this.setState({
      variableName: name
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

  focusTextInput(){
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
    if (this.props.isActionSuccess) {
      this.props.updateVariables()
    }
    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
        scroll="body"
      >
        <DialogContent>
          <Typography>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="variables.new_variable" />
            </h4>
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
                label={<FormattedMessage id="variables.new_variable.variable" />}
                fullWidth
                autoFocus
                inputRef={this.textInput}
                value={this.state.variableName}
                onChange={this.handleVariableNameChange}
                helperText="Das ist deine Variable. Du kannst Variablen in jeden deiner Befehle einbinden."
                margin="normal"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      $
                    </InputAdornment>
                  )
                }}
              />
            </CardContent>
          </Card>
          <Card className="pluginCard" style={{ marginTop: '15px' }}>
            <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                id="outlined-textarea"
                label={<FormattedMessage id="variables.new_variable.output" />}
                fullWidth
                inputRef={this.textInput}
                value={this.state.variableOutput}
                onChange={this.handleVariableOutputChange}
                multiline
                rows="3"
                helperText="Das ist die Ausgabe deiner Variable."
                margin="normal"
                variant="outlined"
              />
            </CardContent>
          </Card>
          <Button
            disabled={!this.state.variableName.trim() || !this.state.variableOutput.trim()}
            fullWidth
            style={{ marginTop: '15px' }}
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
  isActionSuccess: variablesSelectors.isActionSuccess(state),
  disabled: variablesSelectors.isDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  updateVariables: () => dispatch(variablesOperations.loadVariables()),
  addVariable: (name, output) => dispatch(variablesOperations.addVariable(name, output)),
  verifyData: () => dispatch(variablesOperations.verifyData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Variable);
