import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { FormattedMessage } from 'react-intl';

import { authSelectors } from '../../../state/auth';

class Privacy extends Component {
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
            <h1 style={{ marginTop: '0px' }}>
              Informationen zur Datenerhebung
              {isSetUp &&
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" onClick={event => this.handleClick(event, '/')}>
                  <Icon style={{ marginRight: '5px' }}>arrow_back</Icon>
                  <FormattedMessage id="common.back_to_panel" />
                </Button>
              </span>}
            </h1>
            <small>
              Twasi erhebt Ihre Daten zum Zweck der Vertragsdurchführung, zur Erfüllung ihrer vertraglichen und vorvertraglichen Pflichten.
              Die Datenerhebung und Datenverarbeitung ist für die Durchführung des Vertrags erforderlich und beruht auf Artikel 6 Abs. 1 b) DSGVO.
              Ohne explizite Zustimmung gibt Twasi keine personenbezogenen Daten an Dritte weiter.
              Die Daten werden gelöscht, sobald sie für den Zweck ihrer Verarbeitung nicht mehr erforderlich sind.
              Gemäß Artikel 37 DSGVO und § 38 BDSG (neu) benötigt Twasi keinen Datenschutzbeauftragten.
              Fragen zum Datenschutz beantworten wir unter der E-Mail Adresse info@twasi.net
            </small>
          </Typography>
        </Paper>
        <Paper className="pageContainer">
          <Typography>
            <h4 style={{ marginTop: '0px' }}>Ihre Rechte laut DSGVO und BDSG</h4>
            <small>
              - Das Recht die Daten einzusehen, die bei uns im Zusammenhang mit Ihnen gespeichert sind.<br />
              - Dazu genügt eine kurze, formlose Anfrage per Mail an datenschutz@twasi.net<br />
              - Das Recht auf Berichtigung falscher Daten.<br />
              - Das Recht auf die Einschränkung der Verarbeitung Ihrer Daten beziehungsweise das Widerspruchsrecht gegen die Verarbeitung Ihrer Daten.<br />
              - Das Recht auf Löschung von nicht mehr zur Erfüllung des Vertrages benötigten Daten.<br />
              - Das Recht auf Datenübertragbarkeit.<br />
              - Das Beschwerderecht bei einer Aufsichtsbehörde.<br />
            </small>
            <Divider className="marginDivider" />
            <h4>Die von uns erhobenen Daten</h4>
            <small>
              <u>Kontakt per E-Mail / Kontaktformular</u><br />
              Per E-Mail oder Kontaktformular übermittelte Daten werden von uns sicher gespeichert und werden zur Kontaktaufnahme, zur Ausführung vorvertraglicher und vertraglicher Pflichten genutzt.
              <br /><br />
              <u>Profilinformationen und Nutzungsverhalten</u><br />
              Wir speichern von registrierten Benutzern folgende Daten:
              Twitch User ID, Twitch Username, E-Mail Adresse, Registrierungsdatum, Follower-, Chat- und View Anzahl auf Twitch, Aktivitäten in den Livestreams von teilnehmenden Streamern, Logindaten (Zeitpunkt, Nutzername), Inhalt der geschriebenen Chatnachrichten, Zitate des Streamers, Zuschauerzeiten bei teilnehmenden Streamern, Aktueller Streamtitel und aktuelles Spiel, welches gespielt wird
              Die Daten werden in der Regel nach Authentifizierung des Nutzers automatisiert von der Twitch API abgefragt und auf dem Twasi-Server gespeichert.
              Die gespeicherten Daten werden zur Erfüllung der vorvertraglichen und vertraglichen Pflichten genutzt und nicht ohne explizite Zustimmung an Dritte weitergegeben.
            </small>
            <Divider className="marginDivider" />
            <h4>Nutzung unserer Webseite</h4>
            <small>
              Die Nutzung unserer frei zugänglichen Webseite (Twasi ohne Subdomain) ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
              Die Nutzung unserer Leistungen im Login-geschützten Seitenbereich ist nur nach Registrierung möglich. Zur Bereitstellung der dort erbrachten Leistungen müssen wir einige Daten erheben und speichern, welche im Absatz “Profilinformationen und Nutzungsverhalten” aufgelistet sind.
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
              Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
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

export default connect(mapStateToProps)(Privacy);
