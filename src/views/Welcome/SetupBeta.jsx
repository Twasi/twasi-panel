import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FormattedMessage } from 'react-intl';

class SetupBeta extends Component {
  render() {
    const { tosError, acceptsTos, setAcceptsTos, betaKey, setBetaKey, betaKeyError } = this.props;

    return (
      <div>
        <Typography>
          <h3 style={{ marginBottom: '5px' }} className="pageContainerTitle">Freischaltung für die Closed Beta</h3>
          <small>
            Hier kannst du deinen persönlichen Beta Key einlösen, um an der Closed Beta von Twasi 2 teilzunehmen.<br />
          </small>
        </Typography>
        <Card className="pluginCard" style={{ marginTop: '25px' }}>
          <CardContent style={{ padding: '24px' }}>
            <TextField
              style={{ marginBottom: '25px' }}
              label="Dein Beta Key"
              multiline
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              value={betaKey}
              onChange={e => setBetaKey(e.target.value)}
              // Falls gültig color auf primary und Text abändern.
              helperText={betaKeyError && <Typography color="secondary"><FormattedMessage id="setup.step.closed_beta.key_invalid" /></Typography>}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>
                      vpn_key
                    </Icon>
                  </InputAdornment>
                )
              }}
            />
            <FormControlLabel
              style={{ margin: '0px' }}
              control={
                <Checkbox
                  color="primary"
                  value="checkedA"
                  checked={acceptsTos}
                  onChange={(e, isChecked) => setAcceptsTos(isChecked)} />
              }
              label={<Typography>Ich habe die <Link color="primary" href="/">Nutzungsbedingungen</Link> gelesen und
                akzeptiere diese.
              </Typography>}
            />
            {tosError && <Typography color="secondary"><FormattedMessage id="setup.step.closed_beta.accept_tos" /></Typography>}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default SetupBeta;
