import React from "react";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import { CustomPicker } from "react-color";
import {
  EditableInput,
  Hue,
  Saturation
} from "react-color/lib/components/common";

import './_style.css';

export const MyPicker = ({ hex, hsl, hsv, onChange }) => {
  const styles = {
    hue: {
      height: 10,
      width: '100%',
      position: "relative",
      float: 'left',
    },
    saturation: {
      width: 168,
      height: 168,
      position: "relative",
      float: 'left',
    },
    input: {
      height: 30,
      width: '100px',
      border: `3px solid ${hex}`,
      paddingLeft: 10
    },
    swatch: {
      width: '68px',
      height: 30,
      background: hex
    }
  };
  return (
    <Card style={{ width: '200px' }} className="pluginCard">
      <CardContent className="pluginCardContent anim">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={styles.saturation}>
              <Saturation hsl={hsl} hsv={hsv} onChange={onChange} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={styles.hue}>
              <Hue hsl={hsl} onChange={onChange} direction={'horizontal'} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: "flex" }}>
              <EditableInput
                style={{ input: styles.input }}
                value={hex}
                onChange={onChange}
              />
              <div style={styles.swatch} />
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CustomPicker(MyPicker);
