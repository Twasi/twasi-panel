import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import Logo from '../common/resources/text_logo_twasi.svg';
import LogoPNG from '../common/resources/text_logo_twasi.png';

class Branding extends Component {
  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }
  render() {
    return (
      <div className="pageContent">
        <Paper className="pageContainer">
          <Typography>
            <h4 className="pageContainerTitle">
              Unser Logo
            </h4>
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
                <h4 className="pageContainerTitle">
                  Logo Richtlinien
                </h4>
                <small>
                  Das Chamäleon darf <b>nicht</b> von dem Logo getrennt dargestellt werden.<br />
                  Die Proportionen <b>müssen</b> eingehalten werden (<b>kein Verzerren/Strecken/Stauchen</b>).<br />
                  Die Farbe des Chamäleons <b>muss</b> die dargestellte Farbe sein, <b>kein Schwarz/Weiß</b>.<br />
                  Das Logo darf <b>nicht gedreht</b> werden, da sonst das Chamäleon abstürzen könnte.<br />
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
      </div>
    );
  }
}

export default Branding;
