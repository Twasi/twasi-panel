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
import Slider from '@material-ui/core/Slider';
import { Checkboard } from "react-color/lib/components/common";

import ColorPicker from './ColorPicker'

class ThemeCreator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: '#1a2035', // Background color of the whole Page
      buttonRadius: 100, // Radius of Buttons
      panelRadius: 4, // Radius of Panel Elements
      specialContentRadius: 15, // Radius of Cards (Special Content)
      panelBackgroundColor: '#202940', // Backgroundcolor of Panel Elements
      fontColor: '#afb6c5', // Fontcolor
      buttonFontColor: '#ffffff', // Button Font color
      primaryColor: '#3f51b5', // Primary color
      secondaryColor: '#de6464', // Secondary color
      specialContentColor: '#232f4a' // Background color of Cards and Special Contents
    };
  }

  handleButtonRadius = (event, buttonRadius) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ buttonRadius });
  };
  handlePanelRadius = (event, panelRadius) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ panelRadius });
  };
  handleSpecialContentRadius = (event, specialContentRadius) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ specialContentRadius });
  };

  handleChangeBackgroundColor = (color) => {
    this.setState({ backgroundColor: color.hex });
  }
  handleChangePanelBackgroundColor = (color) => {
    this.setState({ panelBackgroundColor: color.hex });
  }
  handleChangeSpecialContentColor = (color) => {
    this.setState({ specialContentColor: color.hex });
  }
  handleChangePrimaryColor = (color) => {
    this.setState({ primaryColor: color.hex });
  }
  handleChangeSecondaryColor = (color) => {
    this.setState({ secondaryColor: color.hex });
  }
  handleChangeFontColor = (color) => {
    this.setState({ fontColor: color.hex });
  }
  handleChangeButtonFontColor = (color) => {
    this.setState({ buttonFontColor: color.hex });
  }

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
                  Content
                </h4>
              </Typography>
              <br />
              <Card className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label="Background color" color={this.state.backgroundColor} onChange={this.handleChangeBackgroundColor}/>
                  <Divider className="marginDivider" />
                  <ColorPicker label="Font color" color={this.state.fontColor} onChange={this.handleChangeFontColor}/>
                  <Divider className="marginDivider" />
                  <ColorPicker label="Primary color" color={this.state.primaryColor} onChange={this.handleChangePrimaryColor}/>
                  <Divider className="marginDivider" />
                  <ColorPicker label="Secondary color" color={this.state.secondaryColor} onChange={this.handleChangeSecondaryColor}/>
                </CardContent>
              </Card>
            </Paper>
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  Panels
                </h4>
              </Typography>
              <br />
              <Card className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label="Background color" color={this.state.panelBackgroundColor} onChange={this.handleChangePanelBackgroundColor}/>
                  <Divider className="marginDivider" />
                  <Typography>
                    <small>Border Radius</small>
                  </Typography>
                  <Slider
                    defaultValue={0}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    value={this.state.panelRadius}
                    onChange={this.handlePanelRadius}
                    step={1}
                    min={0}
                    max={50}
                  />
                </CardContent>
              </Card>
            </Paper>
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  Special Contents
                </h4>
              </Typography>
              <br />
              <Card className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label="Background color" color={this.state.specialContentColor} onChange={this.handleChangeSpecialContentColor}/>
                  <Divider className="marginDivider" />
                  <Typography>
                    <small>Border Radius</small>
                  </Typography>
                  <Slider
                    defaultValue={0}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    value={this.state.specialContentRadius}
                    onChange={this.handleSpecialContentRadius}
                    step={1}
                    min={0}
                    max={50}
                  />
                </CardContent>
              </Card>
            </Paper>
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  Buttons
                </h4>
              </Typography>
              <br />
              <Card className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label="Font color" color={this.state.buttonFontColor} onChange={this.handleChangeButtonFontColor}/>
                  <Divider className="marginDivider" />
                  <Typography>
                    <small>Border Radius</small>
                  </Typography>
                  <Slider
                    defaultValue={0}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    value={this.state.buttonRadius}
                    onChange={this.handleButtonRadius}
                    step={1}
                    min={0}
                    max={50}
                  />
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
                    <Typography component={'span'} style={{ color: this.state.fontColor }}>
                      <h4 className="pageContainerTitle">
                        Content background
                      </h4>
                      <small>
                        This will be the overall background color of the site.
                      </small>
                    </Typography>
                    <Paper className="pageContainer" style={{ marginTop: '25px', backgroundColor: this.state.panelBackgroundColor, borderRadius: this.state.panelRadius+"px" }}>
                      <Typography component={'span'} style={{ color: this.state.fontColor }}>
                        <h4 className="pageContainerTitle">
                          Example panel
                        </h4>
                        <small>
                          Panels look like this.
                        </small>
                      </Typography>
                      <Card style={{ marginTop: '25px', background: this.state.specialContentColor, borderRadius: this.state.specialContentRadius+"px" }} className="pluginCard">
                        <CardContent style={{ backgroundColor: this.state.specialContentColor }} className="pluginCardContent">
                          <Typography component={'span'} style={{ color: this.state.fontColor }}>
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
                          <TableRow style={{ borderBottom: '3px solid '+this.state.primaryColor }}>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className="anim">
                          <TableRow>
                            <TableCell style={{ color: this.state.fontColor }}>1</TableCell>
                            <TableCell style={{ color: this.state.fontColor }}>Foobar</TableCell>
                          </TableRow>
                          <TableRow style={{ backgroundColor: this.state.specialContentColor }}>
                            <TableCell style={{ color: this.state.fontColor }}>2</TableCell>
                            <TableCell style={{ color: this.state.fontColor }}>Lorem Ipsum</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <br />
                      <Grid container spacing={4}>
                        <Grid item xs={6} style={{ textAlign: 'center' }}>
                          <Button variant="contained" color="primary" style={{ background: this.state.primaryColor, borderRadius: this.state.buttonRadius+"px", color: this.state.buttonFontColor }}>
                            Primary color button
                          </Button>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'center' }}>
                          <Button variant="contained" color="secondary" style={{ background: this.state.secondaryColor, borderRadius: this.state.buttonRadius+"px", color: this.state.buttonFontColor }}>
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
