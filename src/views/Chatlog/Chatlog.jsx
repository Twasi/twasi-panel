import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import './_style.css';

class Chatlog extends Component {

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
          <Typography color="textPrimary"><FormattedMessage id="sidebar.chatlog" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer">
          <Typography component={'span'}>
            <h4 className="pageContainerTitle">
              Chat Statistiken
              <span style={{ float: 'right' }}>
                <Button
                  variant="contained"
                  color="primary"
                >
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                </Button>
              </span>
            </h4>
            <small>
              Deine Chatstatistiken
            </small>
          </Typography>
          <Grid container spacing={4}>
              <Grid item xs={4}>
                <Card style={{ marginTop: '25px', textAlign: 'center' }} className="pluginCard">
                  <CardContent className="pluginCardContent translucentBoxLeaderboard">
                    <Typography className={'translucentBoxText'} component={"div"}>
                      <h1 className="pageContainerTitle">
                        1
                      </h1>
                      <h4 className="pageContainerTitle">
                        Timeouts
                      </h4>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card style={{ marginTop: '25px', textAlign: 'center' }} className="pluginCard">
                  <CardContent className="pluginCardContent translucentBoxLeaderboard">
                    <Typography className={'translucentBoxText'} component={"div"}>
                      <h1 className="pageContainerTitle">
                        1
                      </h1>
                      <h4 className="pageContainerTitle">
                        Bans
                      </h4>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card style={{ marginTop: '25px', textAlign: 'center' }} className="pluginCard">
                  <CardContent className="pluginCardContent translucentBoxLeaderboard">
                    <Typography className={'translucentBoxText'} component={"div"}>
                      <h1 className="pageContainerTitle">
                        2
                      </h1>
                      <h4 className="pageContainerTitle">
                        Chatnachrichten
                      </h4>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={4}>
          <Grid item sm={6}>
            <Paper className="pageContainer">
              <Typography component={'div'}>
                <h4 className="pageContainerTitle">
                  Chatlog
                </h4>
                <small>
                  Chatlog deines Chats
                </small>
              </Typography>
              <Card style={{ marginTop: '25px' }} className="pluginCard">
                <CardContent style={{ padding: '0px 0px 10px 0px' }}>
                  <Table>
                    <TableHead>
                      <TableRow className="TableRow">
                        <TableCell>Zuschauer</TableCell>
                        <TableCell>Nachricht</TableCell>
                        <TableCell>Zeit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="anim">
                      <TableRow>
                        <TableCell>DeineMuddi</TableCell>
                        <TableCell>Besucht alle meinen super coolen Kanal, ich mache Kuchen Giveaways!!!</TableCell>
                        <TableCell>vor 1 Minute</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>DeinPapi</TableCell>
                        <TableCell>Ich hasse alle Karottenkinder!</TableCell>
                        <TableCell>vor 2 Minuten</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
          <Grid item sm={6}>
            <Paper className="pageContainer">
              <Typography component={'div'}>
                <h4 className="pageContainerTitle">
                  Timeouts / Bans
                </h4>
                <small>
                  Timeout und Bans in deinem Kanal
                </small>
              </Typography>
              <Card style={{ marginTop: '25px' }} className="pluginCard">
                <CardContent style={{ padding: '0px 0px 10px 0px' }}>
                  <Table>
                    <TableHead>
                      <TableRow className="TableRow">
                        <TableCell>Zuschauer</TableCell>
                        <TableCell>Mod</TableCell>
                        <TableCell>Dauer</TableCell>
                        <TableCell>Grund</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="anim">
                      <TableRow>
                        <TableCell>DeineMuddi</TableCell>
                        <TableCell>Blechkelle</TableCell>
                        <TableCell>
                          <Chip color="primary" label="10 Minuten"/>
                        </TableCell>
                        <TableCell>Eigenwerbung ist nicht erlaubt</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>DeinPapi</TableCell>
                        <TableCell>Blechkelle</TableCell>
                        <TableCell>
                          <Chip color="secondary" label="Permanent"/>
                        </TableCell>
                        <TableCell>Werd Erwachsen du Lurch!</TableCell>
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

export default Chatlog;
