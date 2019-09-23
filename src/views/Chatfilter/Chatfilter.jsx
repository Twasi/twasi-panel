import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Slider from '@material-ui/core/Slider';

import Kreygasm from '../common/resources/Kreygasm.png';
import LUL from '../common/resources/LUL.png';
import PogChamp from '../common/resources/PogChamp.png';
import MonkaX from '../common/resources/monkaX.gif';

import './_style.css';

const marks = [
  {
    value: 0,
    label: (
      <div style={{ textAlign: 'center' }}>
        <img
          style={{ height: '50px', marginTop: '15px' }}
          src={LUL}
          alt="LUL"
        />
        <div>
          Keinen Schutz
        </div>
      </div>
    ),
  },
  {
    value: 33,
    label: (
      <div style={{ textAlign: 'center' }}>
        <img
          style={{ height: '50px', marginTop: '15px' }}
          src={Kreygasm}
          alt="Kreygasm"
        />
        <div>
          Leichten Schutz
        </div>
      </div>
    ),
  },
  {
    value: 66,
    label: (
      <div style={{ textAlign: 'center' }}>
        <img
          style={{ height: '50px', marginTop: '15px' }}
          src={PogChamp}
          alt="PogChamp"
        />
        <div>
          Guten Schutz
        </div>
      </div>
    ),
  },
  {
    value: 100,
    label: (
      <div style={{ textAlign: 'center' }}>
        <img
          style={{ height: '50px', marginTop: '15px' }}
          src={MonkaX}
          alt="MonkaX"
        />
        <div>
          Besser als jeder Mod Schutz
        </div>
      </div>
    ),
  },
];

class Chatfilter extends Component {

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  render() {
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.chatfilter" /></Typography>
        </Breadcrumbs>
        <Grid container spacing={4}>
          <Grid item sm={12}>
            <Paper className="pageContainer">
              <Typography component={'div'}>
                <h4 className="pageContainerTitle"><FormattedMessage id="sidebar.chatfilter" /></h4>
                <small>Subtitle</small>
              </Typography>
              <Card style={{ marginTop: '25px' }} className="pluginCard">
                <CardContent style={{ padding: '50px 150px 100px 150px' }}>
                  <Slider
                    defaultValue={0}
                    aria-labelledby="discrete-slider-restrict"
                    step={null}
                    marks={marks}
                  />
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Chatfilter;
