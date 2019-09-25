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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';

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
          Kein Schutz
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
          Leichter Schutz
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
          Guter Schutz
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
  }
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
                <h4 className="pageContainerTitle"><FormattedMessage id="chatfilter.title" /></h4>
                <small><FormattedMessage id="chatfilter.subtitle" /></small>
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
              <Card style={{ marginTop: '25px' }} className="pluginCard">
                <CardContent>
                  <Table>
                    <TableHead>
                      <TableRow className="TableRow">
                        <TableCell></TableCell>
                        <TableCell style={{ textAlign: 'center' }}>Kein Schutz</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>Leichter Schutz</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>Guter Schutz</TableCell>
                        <TableCell style={{ textAlign: 'center' }}>Besser als jeder Mod Schutz</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Spam Schutz</TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>clear</Icon>
                          </Avatar>
                        </TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>check</Icon>
                          </Avatar>
                        </TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>check</Icon>
                          </Avatar>
                        </TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>check</Icon>
                          </Avatar>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Link Schutz</TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>clear</Icon>
                          </Avatar>
                        </TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>check</Icon>
                          </Avatar>
                        </TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>check</Icon>
                          </Avatar>
                        </TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>check</Icon>
                          </Avatar>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Emote Schutz</TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>clear</Icon>
                          </Avatar>
                        </TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>clear</Icon>
                          </Avatar>
                        </TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>check</Icon>
                          </Avatar>
                        </TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>check</Icon>
                          </Avatar>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Intelligenter Schutz</TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>clear</Icon>
                          </Avatar>
                        </TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>clear</Icon>
                          </Avatar>
                        </TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>clear</Icon>
                          </Avatar>
                        </TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>check</Icon>
                          </Avatar>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>BSG Schutz</TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>clear</Icon>
                          </Avatar>
                        </TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar style={{ backgroundColor: 'primary' }}>
                            <Icon>clear</Icon>
                          </Avatar>
                        </TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>clear</Icon>
                          </Avatar>
                        </TableCell>
                        <TableCell style={{ textAlign: '-webkit-center' }}>
                          <Avatar>
                            <Icon>check</Icon>
                          </Avatar>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
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
