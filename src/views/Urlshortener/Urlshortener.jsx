import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-grid-system';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './_style.css';

class Urlshortener extends Component {
  state = {
    protocol: 10,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="sidebar.urlshortener" />
        </h2>
        <Row>
          <Col sm={6}>
            <Paper className="pageContainer">
              <h4 className="pageContainerTitle">
                URL Kürzen
                <span style={{ float: 'right' }}>
                  <Button
                    variant="contained"
                    color="primary"
                  >
                    Speichern
                  </Button>
                </span>
              </h4>
              <small>Kürze deine URL's um sie mit jedem zu teilen.</small>
              <Divider className="marginDivider" />
              <Card className="pluginCard">
                <CardContent className="pluginCardContent">
                  <TextField
                    helperText="Freilassen für eine zufällige URL."
                    fullWidth
                    id="shortlink"
                    onChange={evt => this.updateInputValue(evt)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          style={{
                            padding: '0px',
                            zIndex: '1'
                          }}
                          position="start"
                        >
                          https://twa.si/c/
                        </InputAdornment>
                      )
                    }}
                  />
                </CardContent>
              </Card>
              <span
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                  width: '100%',
                  padding: '15px 0px 15px 0px'
                }}
              >
                <Icon
                  className="urlshortener_arrow"
                  style={{
                    fontSize: 36
                  }}
                >
                  arrow_downward
                </Icon>
              </span>
              <Card className="pluginCard">
                <CardContent className="pluginCardContent">
                  <TextField
                    helperText="Auf welche Domain soll dein Shortlink leiten?"
                    fullWidth
                    id="shortlink-redirection"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          style={{
                            padding: '0px',
                            zIndex: '1',
                          }}
                          position="start"
                        >
                            <Select
                              disableUnderline={true}
                              value={this.state.protocol}
                              onChange={this.handleChange}
                              inputProps={{
                                name: 'protocol',
                              }}>
                              <MenuItem value={10}>http://</MenuItem>
                              <MenuItem value={20}>https://</MenuItem>
                            </Select>
                        </InputAdornment>
                      )
                    }}
                  />
                </CardContent>
              </Card>
            </Paper>
          </Col>
          <Col sm={6}>
            <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
              <h4 className="pageContainerTitle">Deine URL's</h4>
              <small>
                Hier findest du eine Liste deiner bereits gekürzten URL's
              </small>
            </Paper>
            <Paper className="pageContainer" style={{ padding: '0px', margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
              <Table>
                <TableHead
                  adjustForCheckbox={false}
                  displaySelectAll={false}
                  selectable={false}
                >
                  <TableRow className="TableRow">
                    <TableCell>Shortlink</TableCell>
                    <TableCell>Weiterleitung</TableCell>
                    <TableCell>Aktionen</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody displayRowCheckbox={false}>
                  <TableRow>
                    <TableCell style={{ wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '100px' }}>
                      <a style={{ color: '#00aeae' }} href="#">
                        https://twa.si/c/test
                      </a>
                    </TableCell>
                    <TableCell style={{ wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '100px' }}>
                      <a style={{ color: '#00aeae' }} href="#">
                        https://blechkelle.com
                      </a>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Bearbeiten" placement="top">
                        <Button
                          variant="fab"
                          className="noshadow"
                          color="primary"
                          mini
                          aria-label="editCommand"
                        >
                          <Icon style={{ color: '#ffffff' }}>edit</Icon>
                        </Button>
                      </Tooltip>{' '}
                      <Tooltip title="Löschen" placement="top">
                        <Button
                          variant="fab"
                          className="noshadow"
                          color="secondary"
                          mini
                          aria-label="deleteCommand"
                        >
                          <Icon style={{ color: '#ffffff' }}>delete</Icon>
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '100px' }}>
                      <a style={{ color: '#00aeae' }} href="#">
                        https://twa.si/c/twitter
                      </a>
                    </TableCell>
                    <TableCell style={{ wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '100px' }}>
                      <a style={{ color: '#00aeae' }} href="#">
                        https://twitter.com/blechkelle
                      </a>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Bearbeiten" placement="top">
                        <Button
                          variant="fab"
                          className="noshadow"
                          color="primary"
                          mini
                          aria-label="editCommand"
                        >
                          <Icon style={{ color: '#ffffff' }}>edit</Icon>
                        </Button>
                      </Tooltip>{' '}
                      <Tooltip title="Löschen" placement="top">
                        <Button
                          variant="fab"
                          className="noshadow"
                          color="secondary"
                          mini
                          aria-label="deleteCommand"
                        >
                          <Icon style={{ color: '#ffffff' }}>delete</Icon>
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}

Urlshortener.propTypes = {};

export default withRouter(connect()(Urlshortener));
