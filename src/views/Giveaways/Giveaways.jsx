import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { Container, Row, Col } from 'react-grid-system';
import Divider from 'material-ui/Divider';
import Button from '@material-ui/core/Button';
import { Card, CardText } from 'material-ui/Card';

import './_style.css';

class Giveaways extends Component {
  render() {
    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="sidebar.giveaways" />
        </h2>
        <Row>
          <Col sm={6}>
            <Paper className="pageContainer">
              <h4 className="pageContainerTitle">Giveaways</h4>
              <small>Erstelle ein neues Giveaway.</small>
              <Divider className="marginDivider" />
              <Card className="pluginCard">
                <CardText>
                  <p>
                    <b>Schritt 1:</b> Für welche Nutzergruppen ist das Giveaway?
                  </p>
                  <Row>
                    <Col sm={4}>
                      <Button
                        fullWidth
                        style={{ marginRight: '15px' }}
                        variant="outlined"
                      >
                        Mods
                      </Button>
                    </Col>
                    <Col sm={4}>
                      <Button
                        fullWidth
                        style={{ marginRight: '15px' }}
                        variant="outlined"
                      >
                        Subscriber
                      </Button>
                    </Col>
                    <Col sm={4}>
                      <Button
                        fullWidth
                        style={{ marginRight: '15px' }}
                        variant="outlined"
                      >
                        Normalos
                      </Button>
                    </Col>
                  </Row>
                </CardText>
              </Card>
              <Divider className="marginDivider" />
              <Card className="pluginCard">
                <CardText>
                  <p>
                    <b>Schritt 2:</b> Welche Art Giveaway?
                  </p>
                  <Row>
                    <Col sm={4}>
                      <Button
                        fullWidth
                        style={{ marginRight: '15px' }}
                        variant="outlined"
                      >
                        Wort im Chat
                      </Button>
                    </Col>
                    <Col sm={4}>
                      <Button
                        fullWidth
                        style={{ marginRight: '15px' }}
                        variant="outlined"
                      >
                        Zufälliger Nutzer
                      </Button>
                    </Col>
                    <Col sm={4}>
                      <Button
                        fullWidth
                        style={{ marginRight: '15px' }}
                        variant="outlined"
                      >
                        Zufällige Zahl
                      </Button>
                    </Col>
                  </Row>
                </CardText>
              </Card>
            </Paper>
          </Col>
          <Col sm={6}>
            <Paper className="pageContainer">
              <h4 className="pageContainerTitle">Chat</h4>
              <small>Dein Twitch Chat.</small>
              <Divider className="marginDivider" />
              <iframe
                frameborder="0"
                scrolling="no"
                id="chat_embed"
                src="http://www.twitch.tv/embed/blechkelle/chat"
                height="600"
                width="100%"
              />
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}

Giveaways.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string
  })
};

export default withRouter(connect()(Giveaways));
