import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import { authSelectors } from '../../state/auth';

import Logo from '../common/resources/text_logo_twasi.svg';
import LogoPNG from '../common/resources/text_logo_twasi.png';

import './_style.css';

class Branding extends Component {
  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }
  handleClick = (event, value) => {
    const { history } = this.props;

    history.push(value);
    this.setState({});
  }
  render() {
    const { isSetUp } = this.props;
    return (
      <div className="pageContent">
        <Paper className="pageContainer">
          <Typography>
            <h1 className="pageContainerTitle">
              Unser Logo
              {isSetUp &&
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" onClick={event => this.handleClick(event, '/')}>
                  <Icon style={{ marginRight: '5px' }}>arrow_back</Icon>
                  <FormattedMessage id="common.back_to_panel" />
                </Button>
              </span>}
            </h1>
            <small>
              Das Twasi Logo besteht aus dem Chamäleon und dem Schriftzug "Twasi" mit quer gestelltem "NET".<br />
              Das Logo ist in Zusammenarbeit mit unserem Designer Toni entstanden und gilt seit 2019 als Symbol vom Twasi.<br />
              Jeder darf die hier bereitgestellten Resourcen nutzen, solange die folgenden Richtlinien beachtet werden.
            </small>
          </Typography>
        </Paper>
        <Paper className="pageContainer">
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Card className="pluginCard">
                <CardContent className="pluginCardContent">
                  <img src={Logo} alt="Twasi Logo" />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                <h1 className="pageContainerTitle">
                  Logo Richtlinien
                </h1>
                <small>
                  - Das Chamäleon darf <b>nicht</b> von dem Text "TwasiNET" getrennt dargestellt werden.<br />
                  - Die Proportionen <b>müssen</b> eingehalten werden (<b>kein Verzerren/Strecken/Stauchen</b>).<br />
                  - Die Farbe des Chamäleons <b>muss</b> die dargestellte Farbe sein, <b>kein Schwarz/Weiß</b>.<br />
                  - Das Logo darf <b>nicht gedreht</b> werden, da sonst das Chamäleon abstürzen könnte.<br />
                </small>
              </Typography>
              <br />
              <Button style={{ marginRight: '16px', color: '#ffffff' }} variant="contained" color="primary" download href={Logo}>
                <Icon style={{ marginRight: '5px' }}>cloud_download</Icon>
                <FormattedMessage id="branding.download.svg" />
              </Button>
              <Button style={{ color: '#ffffff' }} variant="contained" color="primary" download href={LogoPNG}>
                <Icon style={{ marginRight: '5px' }}>cloud_download</Icon>
                <FormattedMessage id="branding.download.png" />
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper className="pageContainer">
          <Typography>
            <h1 className="pageContainerTitle">
              Farben
            </h1>
            <small>
              Das sind die Farben, die wir am häufigsten nutzen.
            </small>
          </Typography>
          <br />
          <Card className="pluginCard">
            <CardContent className="pluginCardContent">
              <Grid container spacing={4}>
                <Grid item xs={3}>
                  <Card className="pluginCard">
                    <CardContent className="pluginCardContent twasi-blue">
                      <Typography style={{ color: '#ffffff' }}>
                        <h2 className="pageContainerTitle">
                          #3f51b5
                        </h2>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={3}>
                  <Card className="pluginCard">
                    <CardContent className="pluginCardContent twasi-text">
                      <Typography style={{ color: '#1a2035' }}>
                        <h2 className="pageContainerTitle">
                          #afb6c5
                        </h2>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={3}>
                  <Card className="pluginCard">
                    <CardContent className="pluginCardContent twasi-background">
                      <Typography style={{ color: '#ffffff' }}>
                        <h2 className="pageContainerTitle">
                          #1a2035
                        </h2>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={3}>
                  <Card className="pluginCard">
                    <CardContent className="pluginCardContent twasi-paper">
                      <Typography style={{ color: '#ffffff' }}>
                        <h2 className="pageContainerTitle">
                          #202940
                        </h2>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSetUp: authSelectors.isSetUp(state),
});

export default connect(mapStateToProps)(Branding);
