import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import StepConnector from '@material-ui/core/StepConnector';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedMessage } from 'react-intl';

//import DummyLoadingPage from '../DummyLoadingPage';
import SetupPlugins from './SetupPlugins';
import SetupBeta from './SetupBeta';
import SetupDone from './SetupDone';

import { appInfoSelectors, appInfoOperations } from '../../state/appInfo';
import { authOperations, authSelectors } from '../../state/auth';

import './_style.css';
import RequireAuth from '../../auth/RequireAuth';
import { getGraph } from '../../services/graphqlService';

class Welcome extends Component {
  state = {
    finished: false,
    stepIndex: 0,
    acceptsTos: false,
    tosError: false,
    betaKey: '',
    betaKeyError: false,
    loadings1: false
  };

  componentWillMount() {
    const { updateUserStatus } = this.props;
    updateUserStatus();
  }

  getStepContent() {
    const { stepIndex, acceptsTos, betaKey, tosError, betaKeyError } = this.state;

    switch (stepIndex) {
      // case 0:
      // return (
      // <SetupStart />
      // );
      case 0:
        return (
          <SetupBeta acceptsTos={acceptsTos} setAcceptsTos={value => this.setState({ acceptsTos: value })} tosError={tosError} betaKey={betaKey} setBetaKey={value => this.setState({ betaKey: value })} betaKeyError={betaKeyError} />
        );
      case 1:
        return (
          <SetupPlugins />
        );
      case 2:
        return (
          <SetupDone />
        );
      default:
        return 'Fehler';
    }
  }

  handleNext = () => {
    const { stepIndex, acceptsTos, betaKey } = this.state;
    const { submitBetaKey } = this.props;

    if (stepIndex === 0) {
      if (!acceptsTos) {
        return this.setState({ tosError: true });
      }

      this.setState({ loadings1: true, tosError: false });
      return submitBetaKey(betaKey).then(() => {
        this.setState({
          stepIndex: stepIndex + 1
        });
      }).catch(error => {
        if (error.extensions.localisedKey === 'setup_invalid_code') {
          this.setState({ loadings1: false, betaKeyError: true });
        }
      });
    }

    if (stepIndex === 2) {
      window.location.href = '/';
      return null;
    }

    return this.setState({
      stepIndex: stepIndex + 1
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;

    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  render() {
    const { isSetUp } = this.props;

    if (!isSetUp) {
      const { stepIndex, loadings1 } = this.state;
      const contentStyle = { margin: '0 16px' };
      const connector = (
        <StepConnector />
      );

      return (
        <RequireAuth doNotRequireSetup>
          <div className="contentWelcome">
            <div className="pageContent">
              <Paper className="pageContainer">
                <Stepper alternativeLabel activeStep={stepIndex} connector={connector}>
                  {/*
                  <Step>
                    <StepLabel>
                      Willkommen
                    </StepLabel>
                  </Step>
                  */}
                  <Step>
                    <StepLabel>
                      <FormattedMessage id="setup.step.closed_beta" />
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>
                      <FormattedMessage id="setup.step.plugins" />
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>
                      <FormattedMessage id="setup.step.done" />
                    </StepLabel>
                  </Step>
                </Stepper>
                <div style={contentStyle}>
                  <div>
                    <p>{this.getStepContent(stepIndex)}</p>
                    <Divider />
                    <div style={{ marginTop: 20 }}>
                      {stepIndex >= 2 &&
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={this.handlePrev}
                        style={{ marginRight: 12 }}
                      >
                            <FormattedMessage id="setup.button.back" />
                      </Button>}
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={this.handleNext}
                        disabled={stepIndex === 0 && loadings1}
                      >
                        {stepIndex === 0 && loadings1 && [<CircularProgress size={20} color="white" style={{ marginRight: 10 }} />]}
                        {(() => {
                          switch (stepIndex) {
                            // case 0:
                            // return "Los Geht's";
                            case 0:
                              return <FormattedMessage id="setup.button.next" />;
                            case 1:
                              return <FormattedMessage id="setup.button.next" />;
                            case 2:
                              return <FormattedMessage id="setup.button.panel" />;
                            default:
                              return null;
                          }
                        })()}
                      </Button>
                    </div>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </RequireAuth>
      );
    }

    return <Redirect to="/" />;
  }
}

Welcome.propTypes = {
  isSetUp: PropTypes.bool,
  updateUserStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userStatus: appInfoSelectors.getUserStatus(state),
  isSetUp: authSelectors.isSetUp(state)
});

const mapDispatchToProps = dispatch => ({
  updateUserStatus: () => dispatch(appInfoOperations.loadUserStatus()),
  submitBetaKey: betaKey => dispatch(getGraph(`setup(betaCode:"${betaKey}")`, 'setup')),
  updateIsSetUp: isSetUp => dispatch(authOperations.updateIsSetUp(isSetUp))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Welcome)
);
