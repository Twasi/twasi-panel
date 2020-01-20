import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';

import team_badge from '../common/resources/team_badge.svg';
import beta_badge from '../common/resources/beta_badge.svg';
import gc17_badge from '../common/resources/gamescom_badge_blue.svg';
import gc18_badge from '../common/resources/gamescom_badge_blue18.svg';

import './_style.css';

class Badges extends Component {

  render() {
    return (
      <div className="pageContent">
        <Paper className="pageContainer">
          <Typography component={"div"}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="profile.badges" />
              <span style={{ float: 'right' }}>
                <Button disabled variant="contained" color="primary">
                  <FormattedMessage id="common.save" />
                </Button>
              </span>
            </h4>
            <small>
              <FormattedMessage id="profile.badges_subline" />
            </small>
          </Typography>
          <Card style={{ marginTop: '25px' }} className="pluginCard">
            <CardContent className="pluginCardContent anim">
              <Tooltip title="Twasi Team" placement="top">
                <Fab size="medium" className="badgeButton">
                  <img
                    src={team_badge}
                    alt="Badge"
                    className="profileBadge"
                  />
                </Fab>
              </Tooltip>
              <Tooltip title="Twasi Beta" placement="top">
                <Fab size="medium" className="badgeButton">
                  <img
                    src={beta_badge}
                    alt="Badge"
                    className="profileBadge"
                  />
                </Fab>
              </Tooltip>
              <Tooltip title="Gamescom 2017" placement="top">
                <Fab size="medium" className="badgeButton">
                  <img
                    src={gc17_badge}
                    alt="Badge"
                    className="profileBadge"
                  />
                </Fab>
              </Tooltip>
              <Tooltip title="Gamescom 2018" placement="top">
                <Fab size="medium" className="badgeButton">
                  <img
                    src={gc18_badge}
                    alt="Badge"
                    className="profileBadge"
                  />
                </Fab>
              </Tooltip>
            </CardContent>
          </Card>
        </Paper>
      </div>
    );
  }
}

export default Badges;
