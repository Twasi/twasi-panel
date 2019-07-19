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

class SetupBeta extends Component {
  render() {
    return (
      <div>
        <Typography>
          <h2 style={{ marginBottom: '5px' }} className="pageContainerTitle">Freischaltung für die Closed Beta</h2>
          <small>
            Hier kannst du deinen persönlichen Beta Key einlösen, um an der geschlossenen Beta von Twasi 2 teilzunehmen.<br />
            Wie du an einen Beta Code kommst erfährst du <Link color="primary" href="/">hier</Link>.
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
              // Falls gültig color auf primary und Text abändern.
              helperText={<Typography color="secondary">Dieser Key ist ungültig.</Typography>}
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
                <Checkbox color="primary" value="checkedA" />
              }
              label={<Typography>Ich habe die <Link color="primary" href="/">Nutzungsbedingungen</Link> gelesen und akzeptiere diese.</Typography>}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default SetupBeta;
