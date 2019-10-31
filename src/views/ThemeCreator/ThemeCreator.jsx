import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Divider from '@material-ui/core/Divider';
import { Checkboard } from "react-color/lib/components/common";

import ColorPicker from './ColorPicker'

class ThemeCreator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: '#1a2035',
      borderRadius: 0,
      contentColor: '#202940',
      customHeader: null,
      font: null,
      fontColor: '#afb6c5',
      pillButtons: true,
      primaryColor: 'linear-gradient(135deg, rgb(63, 81, 181), rgb(84, 128, 255))',
      secondaryColor: 'linear-gradient(135deg,#de6464,#ff7b7b)',
      shadows: false,
      specialContentColor: '#232f4a'
    };
  }

  handleChangeBackgroundColor = (color) => {
    console.log(color)
    this.setState({ backgroundColor: color });
  }
  handleChangeContentColor = (color) => {
    this.setState({ contentColor: color });
  }
  handleChangeSpecialContentColor = (color) => {
    this.setState({ specialContentColor: color });
  }
  handleChangePrimaryColor = (color) => {
    this.setState({ primaryColor: color });
  }
  handleChangeSecondaryColor = (color) => {
    this.setState({ secondaryColor: color });
  }

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  render() {
    console.log(this.state.backgroundColor)
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.themecreator" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer">
          <Typography component={'span'}>
            <h4 className="pageContainerTitle">
              Theme Creator
            </h4>
            <small>
              Erstelle, verwalte und veröffentliche deine eigenen Themes für Twasi.
            </small>
          </Typography>
        </Paper>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  Content Background
                </h4>
              </Typography>
              <br />
              <Card className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label="Background color" color={this.state.backgroundColor} onChange={this.handleChangeBackgroundColor}/>
                </CardContent>
              </Card>
            </Paper>
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  Panel Background
                </h4>
              </Typography>
              <br />
              <Card className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label="Background color" color={this.state.contentColor} onChange={this.handleChangeContentColor}/>
                </CardContent>
              </Card>
            </Paper>
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  Special Content Background
                </h4>
              </Typography>
              <br />
              <Card className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label="Background color" color={this.state.specialContentColor} onChange={this.handleChangeSpecialContentColor}/>
                </CardContent>
              </Card>
            </Paper>
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  Primary and Secondary colors
                </h4>
              </Typography>
              <br />
              <Card className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label="Primary color" color={this.state.primaryColor} onChange={this.handleChangePrimaryColor}/>
                  <Divider className="marginDivider" />
                  <ColorPicker label="Secondary color" color={this.state.secondaryColor} onChange={this.handleChangeSecondaryColor}/>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper className="pageContainer" style={{ position: 'sticky', top: '23px' }}>
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  Preview
                </h4>
                <small>
                  This is how the theme will look like.
                </small>
              </Typography>
              <div style={{ position: 'relative', height: 'auto', width: '100%', padding: '50px', marginTop: '25px' }}>
                <Checkboard size={ 8 } white="#fff" grey="#cccccc" />
                <div style={{ position: 'inherit' }}>
                  <div style={{ background: this.state.backgroundColor, padding: '25px' }}>
                    <Typography component={'span'}>
                      <h4 className="pageContainerTitle">
                        Content background
                      </h4>
                      <small>
                        This will be the overall background color of the site.
                      </small>
                    </Typography>
                    <Paper className="pageContainer" style={{ marginTop: '25px', backgroundColor: this.state.contentColor }}>
                      <Typography component={'span'}>
                        <h4 className="pageContainerTitle">
                          Example panel
                        </h4>
                        <small>
                          Panels look like this.
                        </small>
                      </Typography>
                      <Card style={{ marginTop: '25px', background: this.state.specialContentColor }} className="pluginCard">
                        <CardContent style={{ backgroundColor: this.state.specialContentColor }} className="pluginCardContent">
                          <Typography component={'span'}>
                            <h4 className="pageContainerTitle">
                              Special contents
                            </h4>
                            <small>
                              Special contents will be displayed with this background color.
                            </small>
                          </Typography>
                        </CardContent>
                      </Card>
                      <br />
                      <Table>
                        <TableHead>
                          <TableRow className="TableRow">
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className="anim">
                          <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Foobar</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2</TableCell>
                            <TableCell>Lorem Ipsum</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <br />
                      <Grid container spacing={4}>
                        <Grid item xs={6} style={{ textAlign: 'center' }}>
                          <Button variant="contained" color="primary" style={{ background: this.state.primaryColor }}>
                            Primary color button
                          </Button>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'center' }}>
                          <Button variant="contained" color="secondary" style={{ background: this.state.secondaryColor }}>
                            Secondary color button
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ThemeCreator;
