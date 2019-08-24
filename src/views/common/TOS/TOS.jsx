import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { FormattedMessage } from 'react-intl';

import { authSelectors } from '../../../state/auth';

class TOS extends Component {
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
              Nutzungsbedingungen
              {isSetUp &&
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" onClick={event => this.handleClick(event, '/')}>
                  <Icon style={{ marginRight: '5px' }}>arrow_back</Icon>
                  <FormattedMessage id="common.back_to_panel" />
                </Button>
              </span>}
            </h4>
            <small>
            Twasi2-„Closed Beta“
            </small>
            <br />
            <br />
            <small>
              Willkommen im geschlossenen Betaprogramm des TwasiBots.<br />
              Vielen Dank, dass Sie unsere Plattform testen, und sich ggf. in Form von Feedback an der Entwicklung beteiligen möchten.<br/>
              Um unsere Dienste zu nutzen müssen Sie den folgenden Nutzungsbedingungen zustimmen.
            </small>
          </Typography>
        </Paper>
        <Paper className="pageContainer">
          <Typography>
            <h4 style={{ marginTop: '0px' }}>Nutzung unserer Dienste</h4>
            <small>
              Durch die Nutzung von Twasi bzw. des Chatbots willigen Sie ein, dass Daten aus Ihrem öffentlichen
              Twitch-Chat von uns erfasst und persistent gespeichert werden. Hierbei handelt es sich in erster Linie
              um Chatnachrichten und Ereignisprotokolle von besonderen Chatevents. Zu Letzterem zählen unter
              Anderem Follows, Subscriptions und Cheers in Ihrem Kanal. Nähere Informationen dazu finden Sie auf
              der offiziellen Hilfeseite der Plattform.
              Von uns gespeicherte Daten können auf Anfrage aus unserem System gelöscht werden. Voraussetzung hierfür ist, dass diese Daten eindeutig Ihrem Account zugewiesen werden können.
              Sollte dies nicht möglich sein, behalten wir uns vor, besagte Daten weiterhin zu speichern.
              Persönliche Daten und Einstellungen sind hierbei nicht betroffen.
              Um die Löschung der eigenen Daten in Anspruch zu nehmen, reicht eine E-Mail an info@twasi.net
              von der E-Mail Adresse des zu löschenden Accounts. Wir behalten uns vor, vor der endgültigen
              Löschung Kontakt mit Ihnen aufzunehmen, um ungewollten Datenverlust zu vermeiden.
            </small>
            <Divider className="marginDivider" />
            <h4>Pflichten des Nutzers</h4>
            <small>
              Als Teilnehmer des geschlossenen Betaprogramms ist es die Aufgabe des Nutzers, die Applikation für
              eine spätere Veröffentlichung zu testen, um eventuelle Mängel feststellen zu können.
              Nutzer unseres Betaprogramms verpflichten sich dazu, schwere oder sicherheitsgefährdende Fehler
              dem Entwicklungsteam des Bots zu melden. Hierzu kann das Kontaktaufnahmeformular im
              Twasi-Panel genutzt werden.
              Des Weiteren verpflichtet sich der Nutzer, gefunden Schwachstellen am System weder auszunutzen
              noch zu verbreiten und erlangte Nutzerdaten anderer Nutzer geheimzuhalten und zu löschen, sollte
              er durch einen Systemfehler Zugriff darauf erhalten haben.
            </small>
            <Divider className="marginDivider" />
            <h4>Haftungsausschluss</h4>
            <small>
              Die Nutzung von Twasi basiert auf freiwilliger Basis und kann jederzeit beendet werden. Das
              (Entwicklungs-) Team von Twasi haftet nicht für eventuelle Probleme, die durch die Nutzung des
              Twasibots entstanden sind. Die Freischaltung von Funktionen für den Nutzer wird von uns erst nach
              sorgfältigen Tests vorgenommen. Außerdem ist mit wenigen Ausnahmen der gesamte Quellcode der
              Anwendung öffentlich einsehbar (https://github.com/twasi).
              Wir verpflichten uns dazu, dass bei Bekanntwerden größerer Schwachstellen die betroffenen
              Funktionen aus dem Funktionsumfang des Bots entfernt werden, bis ein Update diese behoben hat.
              Der Funktionsumfang von Twasi kann mithilfe von Drittanbieterplugins (Funktionen für den Bot, welche nicht vom eigenen Entwicklungsteam programmiert wurden) erweitert werden. Bevor ein
              solches Plugin für Nutzer zugänglich gemacht wird, wird es von uns auf Programmfehler und
              verdächtige Aktivitäten überprüft. Letzteres beschreibt z. B. das übermitteln von persönlichen Daten
              der Nutzer an den Entwickler des Plugins. Außerdem verpflichtet sich der Entwickler des Plugins, das
              Plugin mit der TOPL (Twasi Official Plugin License) zu versehen. Hierbei handelt es sich um eine eigene
              Lizenz, die den Entwickler des Plugins dazu verpflichtet, sich an Vorschriften wie z. B. Datenschutz zu
              halten. Trotz dieser Vorsichtsmaßnamen können wir nicht für durch andere Entwickler entstandene
              Probleme haften. In einem solchen Falle werden wir uns mit dem verantwortlichen Entwickler in
              Verbindung setzen und nach einer Lösung suchen. Ggf. werden hierbei Plugins entfernt, bis das
              Problem behoben wurde.
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

export default connect(mapStateToProps)(TOS);
