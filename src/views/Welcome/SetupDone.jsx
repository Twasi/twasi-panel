import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class SetupDone extends Component {
  render() {
    return (
      <div>
        <Typography>
          <h2 style={{ marginBottom: '5px' }} className="pageContainerTitle">Geschafft!</h2>
          <small>
            Vielen Dank für deine Anmeldung bei Twasi!<br />
            Falls du noch Fragen hast kannst du nach deiner Freischaltung ein Supportticket erstellen oder uns auf Twitter anschreiben.<br /><br />
            Bitte <b>UNBEDINGT BEACHTEN</b>, dass dies eine sehr frühe Version ist und viele Funktionen noch nicht bzw. nur bedingt funktionieren.<br />
            Es werden regelmäßig neue Elemente und Funktionen hinzugefügt.<br /><br />
            Wir übernehmen keine Gewähr für verloren gegangene Daten während der neuen Versionen.
          </small>
        </Typography>
      </div>
    );
  }
}

export default SetupDone;
