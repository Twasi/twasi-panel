import { createMuiTheme } from '@material-ui/core/styles';

import './twasi-light.css';

export default createMuiTheme({
  palette: {
    type: 'light',
    background: {
      default: '#e6e6e6',
    },
    primary: {
      main: '#00aeae',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#e53935',
      contrastText: '#ffffff'
    }
  },
  neutral: {
    color: '#da7720'
  },
  overrides: {
    MuiPaper: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#636363', // Some CSS
        backgroundColor: '#fff',
        borderRadius: '4px',
        border: '0px solid #25373e'
      }
    },
    MuiBadge: {
      badge: {
        position: 'relative',
        marginLeft: '5px'
      }
    },
    MuiCardContent: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#636363', // Some CSS
        backgroundColor: '#f9f9f9' // Some CSS
      }
    },
    MuiMenuItem: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#636363', // Some CSS
        padding: '10px',
        '&:hover': {
          backgroundColor: '#efefef'
        }
      },
      selected: { // Name of the rule
        color: '#ffffff',
        background: 'linear-gradient(135deg,#00aeae,#02d4d4)'
      }
    },
    MuiListItemText: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#636363'
      }
    },
    MuiButton: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        textTransform: 'none', // Some CSS
        color: '#b7b7b7', // Some CSS
        borderRadius: '50px'
      },
      mini: {
        minHeight: '32px',
        height: '32px',
        width: '32px'
      },
      containedPrimary: {
        boxShadow: 'none',
        background: 'linear-gradient(135deg,#00aeae,#02d4d4)',
        '&$disabled': {
          background: '#efefef',
          color: '#b7b7b7'
        }
      },
      containedSecondary: {
        boxShadow: 'none',
        background: 'linear-gradient(135deg,#e53935,#ff4f4a)',
        '&$disabled': {
          background: '#efefef',
          color: '#636363'
        }
      },
      outlinedPrimary: {
        borderWidth: '1px',
        '&:hover': {
          borderWidth: '1px'
        }
      },
      outlinedSecondary: {
        borderWidth: '1px',
        '&:hover': {
          borderWidth: '1px'
        }
      },
      contained: {
        boxShadow: 'none',
        backgroundColor: '#f9f9f9',
        color: '#636363',
        '&$disabled': {
          backgroundColor: '#f9f9f9',
          color: '#636363'
        },
        '&:hover': {
          backgroundColor: '#efefef'
        }
      }
    },
    MuiTableCell: { // Name of the component ⚛️ / style sheet
      body: { // Name of the rule
        color: '#636363', // Some CSS
        borderColor: 'transparent',
        paddingTop: '15px',
        paddingBottom: '15px'
      }
    },
    MuiTableRow: {
      root: {
        '&:nth-of-type(even)': {
          backgroundColor: '#efefef'
        }
      }
    },
    MuiInputAdornment: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#efefef' // Some CSS
      }
    },
    MuiTabs: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#efefef', // Some CSS
        border: '0px !important'
      }
    },
    MuiTab: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        border: '0px'
      }
    },
    MuiChip: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#efefef' // Some CSS
      },
      colorPrimary: {
        background: 'linear-gradient(135deg,#00aeae,#02d4d4)'
      },
      colorSecondary: {
        background: 'linear-gradient(135deg,#e53935,#ff4f4a)'
      }
    },
    MuiAvatar: { // Name of the component ⚛️ / style sheet
      colorDefault: { // Name of the rule
        backgroundColor: '#b1b1b1', // Some CSS
        color: '#ffffff'
      }
    },
    MuiTypography: { // Name of the component ⚛️ / style sheet
      body1: { // Name of the rule
        color: '#636363' // Some CSS
      }
    },
    MuiTooltip: { // Name of the component ⚛️ / style sheet
      tooltip: { // Name of the rule
        color: '#b7b7b7', // Some CSS
        backgroundColor: '#151e21',
        border: '0px solid #00aeae'
      }
    }
  }
});
