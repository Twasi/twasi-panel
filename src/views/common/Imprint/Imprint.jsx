import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { FormattedMessage } from 'react-intl';

import { authSelectors } from '../../../state/auth';

class Imprint extends Component {
  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }
  handleClick = (event, value) => {
    const { history } = this.props;

    history.push(value);
    this.setState({});
  }
  render() {
    const { isSetUp } = this.props;
    return (
      <div className="pageContent">
        <Paper className="pageContainer">
          <Typography>
            <h4 className="pageContainerTitle">
              Verantwortlich für die Inhalte dieser Seite
              {isSetUp &&
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" onClick={event => this.handleClick(event, '/')}>
                  <Icon style={{ marginRight: '5px' }}>arrow_back</Icon>
                  <FormattedMessage id="common.back_to_panel" />
                </Button>
              </span>}
            </h4>
            <small>
              (gem. § 55 Abs. 2 RStV)
            </small>
            <br />
            <br />
            <samp>
              Jeffrey Schütt<br />
              Windhalmweg 15<br />
              13403 Berlin<br />
              <br />
              Telefon: +49 157 88448482<br />
              Email: info@twasi.net
            </samp>
          </Typography>
        </Paper>
        <Paper className="pageContainer">
          <Typography>
            <h4 style={{ marginTop: '0px' }}>Hinweis zu Inhalten</h4>
            <small>
              Die kostenlosen Inhalte dieser Webseite wurden mit größtmöglicher Sorgfalt erstellt.
              Der Anbieter dieser Webseite übernimmt jedoch keine Gewähr für die Richtigkeit und Aktualität der bereitgestellten Daten des Nutzers.
              Namentlich gekennzeichnete Beiträge geben die Meinung des jeweiligen Autors und nicht immer die Meinung des Anbieters wieder.
              Allein durch den Aufruf der kostenlosen und frei zugänglichen Inhalte kommt keinerlei Vertragsverhältnis zwischen dem Nutzer und dem Anbieter zustande,
              insoweit fehlt es am Rechtsbindungswillen des Anbieters.
            </small>
            <Divider className="marginDivider" />
            <h4>Externe Links</h4>
            <small>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
              Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </small>
            <Divider className="marginDivider" />
            <h4>Urheber- und Leistungsschutzrechte</h4>
            <small>
              Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen Urheber- und Leistungsschutzrecht.
              Jede vom deutschen Urheber- und Leistungsschutzrecht nicht zugelassene Verwertung bedarf der vorherigen schriftlichen Zustimmung des Anbieters oder jeweiligen Rechteinhabers.
              Dies gilt insbesondere für Vervielfältigung, Bearbeitung, Übersetzung, Einspeicherung, Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken oder anderen elektronischen Medien und Systemen.
              Inhalte und Rechte Dritter sind dabei als solche gekennzeichnet.
              Die unerlaubte Vervielfältigung oder Weitergabe einzelner Inhalte oder kompletter Seiten ist nicht gestattet und strafbar.
              Lediglich die Herstellung von Kopien und Downloads für den persönlichen, privaten und nicht kommerziellen Gebrauch ist erlaubt.
              <br /><br />
              Die Darstellung dieser Website in fremden Frames ist nur mit schriftlicher Erlaubnis zulässig.
            </small>
          </Typography>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSetUp: authSelectors.isSetUp(state),
});

export default connect(mapStateToProps)(Imprint);
