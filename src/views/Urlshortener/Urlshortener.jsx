import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-grid-system';
import Divider from 'material-ui/Divider';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import './_style.css';

class Urlshortener extends Component {
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
                URL Kürzer
                <span style={{ float: 'right' }}>
                  <RaisedButton
                    backgroundColor="#00aeae"
                    labelColor="#ffffff"
                    label="Speichern"
                  />
                </span>
              </h4>
              <small>Kürze deine URLs um sie mit jedem zu teilen.</small>
              <Divider className="marginDivider" />
              <TextField
                helperText="Vorschau: https://twa.si/c/"
                fullWidth
                id="shortlink"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      style={{
                        backgroundColor: '#e0e0e0',
                        padding: '0px 15px 0px 15px',
                        zIndex: '99'
                      }}
                      position="start"
                    >
                      https://twa.si/c/
                    </InputAdornment>
                  )
                }}
              />
              <span
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                  width: '100%',
                  padding: '15px 0px 15px 0px'
                }}
              >
                <Icon style={{ fontSize: 36 }}>arrow_downward</Icon>
              </span>
              <TextField
                helperText="Auf welche Domain soll dein Shortlink weiterleiten?"
                fullWidth
                id="shortlink-redirection"
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      style={{
                        backgroundColor: '#e0e0e0',
                        padding: '0px 15px 0px 15px',
                        zIndex: '99'
                      }}
                      position="start"
                    >
                      https://
                    </InputAdornment>
                  )
                }}
              />
            </Paper>
          </Col>
          <Col sm={6}>
            <Paper className="pageContainer">
              <h4 className="pageContainerTitle">Deine URL's</h4>
              <small>
                Hier findest du eine Liste deiner bereits gekürzten URL's
              </small>
            </Paper>
            <Table>
              <TableHeader
                adjustForCheckbox={false}
                displaySelectAll={false}
                selectable={false}
              >
                <TableRow className="TableRow">
                  <TableHeaderColumn>Shortlink</TableHeaderColumn>
                  <TableHeaderColumn>Weiterleitung</TableHeaderColumn>
                  <TableHeaderColumn />
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn>
                    <a style={{ color: '#00aeae' }} href="#">
                      https://twa.si/c/test
                    </a>
                  </TableRowColumn>
                  <TableRowColumn>
                    <a style={{ color: '#00aeae' }} href="#">
                      https://blechkelle.com
                    </a>
                  </TableRowColumn>
                  <TableRowColumn>
                    <a style={{ color: '#e53935' }} href="#">
                      Löschen
                    </a>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>
                    <a style={{ color: '#00aeae' }} href="#">
                      https://twa.si/c/test
                    </a>
                  </TableRowColumn>
                  <TableRowColumn>
                    <a style={{ color: '#00aeae' }} href="#">
                      https://blechkelle.com
                    </a>
                  </TableRowColumn>
                  <TableRowColumn>
                    <a style={{ color: '#e53935' }} href="#">
                      Löschen
                    </a>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>
                    <a style={{ color: '#00aeae' }} href="#">
                      https://twa.si/c/test
                    </a>
                  </TableRowColumn>
                  <TableRowColumn>
                    <a style={{ color: '#00aeae' }} href="#">
                      https://blechkelle.com
                    </a>
                  </TableRowColumn>
                  <TableRowColumn>
                    <a style={{ color: '#e53935' }} href="#">
                      Löschen
                    </a>
                  </TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

Urlshortener.propTypes = {};

export default withRouter(connect()(Urlshortener));
