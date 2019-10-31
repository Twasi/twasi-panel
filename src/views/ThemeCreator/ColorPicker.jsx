import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { CustomPicker } from "react-color";
import Typography from '@material-ui/core/Typography';

class SketchExample extends React.Component {

  componentDidMount() {
    const { color, label } = this.props;
    this.setState({ color: color, label: label })
  }

  state = {
    displayColorPicker: false,
    color: '',
    label: '',
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.hex })
  };

  render() {
    const styles = reactCSS({
      'default': {
        color: {
          width: '100px',
          height: '23px',
          borderRadius: '2px',
          float: 'left',
          background: this.state.color,
        },
        swatch: {
          padding: '3px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <Typography style={{ marginBottom: '10px' }}>
          {this.state.label}
        </Typography>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }
      </div>
    )
  }
}

export default CustomPicker(SketchExample)
