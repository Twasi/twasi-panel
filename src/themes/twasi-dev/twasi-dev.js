import { createMuiTheme } from '@material-ui/core/styles';

import './twasi-dev.css';

export default createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#1a2035',
    },
    primary: {
      main: '#3f51b5',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#de6464',
      contrastText: '#ffffff'
    }
  },
  neutral: {
    color: '#da7720'
  },
  overrides: {
    MuiPaper: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#b7b7b7', // Some CSS
        backgroundColor: '#202940',
        borderRadius: '4px',
        border: '0px solid #25373e'
      },
      elevation1: {
        boxShadow: 'none'
      },
    },
    MuiBadge: {
      badge: {
        position: 'relative',
        marginLeft: '5px'
      }
    },
    MuiCardContent: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#b7b7b7', // Some CSS
        backgroundColor: '#232f4a' // Some CSS
      }
    },
    MuiMenuItem: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#b7b7b7', // Some CSS
        padding: '10px',
        '&:hover': {
          backgroundColor: '#1a2035'
        }
      },
      selected: { // Name of the rule
        color: '#ffffff',
        background: 'linear-gradient(135deg,#3f51b5,#3f51b5)'
      }
    },
    MuiListItemText: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#b7b7b7'
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
        background: 'linear-gradient(135deg,#3f51b5,#3f51b5)',
        '&$disabled': {
          background: '#232f4a',
          color: '#b7b7b7'
        }
      },
      containedSecondary: {
        boxShadow: 'none',
        background: 'linear-gradient(135deg,#de6464,#de6464)',
        '&$disabled': {
          background: '#232f4a',
          color: '#b7b7b7'
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
        backgroundColor: '#232f4a',
        color: '#b7b7b7',
        '&$disabled': {
          backgroundColor: '#232f4a',
          color: '#b7b7b7'
        },
        '&:hover': {
          backgroundColor: '#1a2035'
        }
      }
    },
    MuiTableCell: { // Name of the component ⚛️ / style sheet
      body: { // Name of the rule
        color: '#b7b7b7', // Some CSS
        borderColor: 'transparent',
        paddingTop: '15px',
        paddingBottom: '15px'
      }
    },
    MuiTableRow: {
      root: {
        '&:nth-of-type(even)': {
          backgroundColor: '#232f4a'
        }
      }
    },
    MuiInputAdornment: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#1b292d' // Some CSS
      }
    },
    MuiTabs: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#232f4a', // Some CSS
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
        backgroundColor: '#232f4a' // Some CSS
      },
      colorPrimary: {
        background: 'linear-gradient(135deg,#3f51b5,#3f51b5)'
      },
      colorSecondary: {
        background: 'linear-gradient(135deg,#de6464,#de6464)'
      }
    },
    MuiAvatar: { // Name of the component ⚛️ / style sheet
      colorDefault: { // Name of the rule
        backgroundColor: '#1a2035', // Some CSS
        color: '#ffffff'
      }
    },
    MuiTypography: { // Name of the component ⚛️ / style sheet
      body1: { // Name of the rule
        color: '#b7b7b7' // Some CSS
      }
    },
    MuiTooltip: { // Name of the component ⚛️ / style sheet
      tooltip: { // Name of the rule
        color: '#b7b7b7', // Some CSS
        backgroundColor: '#151e21',
        border: '0px solid #00aeae'
      }
    },
    MuiSelect: {
      root: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.875em',
        borderBottom: '0px',
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.7)',
      },
    },
    MuiExpansionPanelSummary: {
      root: {
        borderRadius: '4px 4px 0px 0px',
        backgroundColor: '#232f4a',
        borderBottom: '3px solid #3f51b5'
      }
    },
    MuiExpansionPanel: {
      root: {
        '&:before': {
          display: 'none'
        }
      }
    }
  }
});
