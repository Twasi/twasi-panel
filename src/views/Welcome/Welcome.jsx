import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import StepConnector from '@material-ui/core/StepConnector';

import DummyLoadingPage from '../DummyLoadingPage';
import SetupPlugins from './SetupPlugins'
import SetupBeta from './SetupBeta'
import SetupStart from './SetupStart'
import SetupDone from './SetupDone'

import { appInfoSelectors, appInfoOperations } from '../../state/appInfo';
import { pluginsOperations } from '../../state/plugins';

import './_style.css';

class Welcome extends Component {
  state = {
    finished: false,
    stepIndex: 0
  };

  componentWillMount() {
    const { updateUserStatus } = this.props;
    updateUserStatus();
  }

  getStepContent() {
    switch (this.state.stepIndex) {
      //case 0:
        //return (
          //<SetupStart />
        //);
      case 0:
        return (
          <SetupBeta />
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
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  render() {
    const { userStatus, children } = this.props;

    if (userStatus === 'OK') {
      return children;
    }
    if (userStatus === 'SETUP') {
      const { stepIndex } = this.state;
      const contentStyle = { margin: '0 16px' };
      const connector = (
        <StepConnector/>
      );

      return (
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
                    Closed Beta
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    Plugins
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    Fertig
                  </StepLabel>
                </Step>
              </Stepper>
              <div style={contentStyle}>
                <div>
                  <p>{this.getStepContent(stepIndex)}</p>
                  <Divider />
                  <div style={{ marginTop: 20 }}>
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={stepIndex === 0}
                      onClick={this.handlePrev}
                      style={{ marginRight: 12 }}
                    >
                          Zurück
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={this.handleNext}
                    >
                      {(() => {
                        switch (stepIndex) {
                          //case 0:
                            //return "Los Geht's";
                          case 0:
                            return 'Weiter';
                          case 1:
                            return 'Weiter';
                          case 2:
                            return 'Zum Panel';
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
      );
    }

    return <DummyLoadingPage />;
  }
}

Welcome.propTypes = {
  children: PropTypes.node,
  userStatus: PropTypes.string,
  updateUserStatus: PropTypes.func.isRequired,
  loadPlugins: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userStatus: appInfoSelectors.getUserStatus(state)
});

const mapDispatchToProps = dispatch => ({
  updateUserStatus: () => dispatch(appInfoOperations.loadUserStatus()),
  loadPlugins: () => dispatch(pluginsOperations.loadData())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Welcome)
);
