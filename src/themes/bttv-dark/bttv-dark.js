import { createMuiTheme } from '@material-ui/core/styles';

import './bttv-dark.css';

export default createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#0f0e11',
    },
    primary: {
      main: '#5f459a',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ec1313',
      contrastText: '#ffffff'
    }
  },
  neutral: {
    color: '#da7720'
  },
  overrides: {
    MuiPaper: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#ffffff', // Some CSS
        backgroundColor: '#19171c',
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
        color: '#b7b7b7', // Some CSS
        backgroundColor: '#232127' // Some CSS
      }
    },
    MuiMenuItem: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#b7b7b7', // Some CSS
        padding: '10px',
        '&:hover': {
          backgroundColor: '#0f0e11'
        }
      },
      selected: { // Name of the rule
        color: '#ffffff',
        background: 'linear-gradient(135deg, #4b367c, #5f459a)'
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
        color: '#ffffff', // Some CSS
        borderRadius: '4px'
      },
      mini: {
        minHeight: '32px',
        height: '32px',
        width: '32px'
      },
      containedPrimary: {
        boxShadow: 'none',
        background: '#14b866',
        '&$disabled': {
          background: '#19171c',
          color: '#b7b7b7'
        }
      },
      containedSecondary: {
        boxShadow: 'none',
        background: '#ec1313',
        '&$disabled': {
          background: '#19171c',
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
        backgroundColor: '#232127',
        color: '#ffffff',
        '&$disabled': {
          backgroundColor: '#232127',
          color: '#ffffff'
        },
        '&:hover': {
          backgroundColor: '#0f0e11'
        }
      }
    },
    MuiTableCell: { // Name of the component ⚛️ / style sheet
      body: { // Name of the rule
        color: '#ffffff', // Some CSS
        borderColor: 'transparent',
        paddingTop: '15px',
        paddingBottom: '15px'
      }
    },
    MuiTableRow: {
      root: {
        '&:nth-of-type(even)': {
          backgroundColor: '#232127'
        }
      }
    },
    MuiInputAdornment: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#232127' // Some CSS
      }
    },
    MuiTabs: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#232127', // Some CSS
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
        backgroundColor: '#232127' // Some CSS
      },
      colorPrimary: {
        background: '#14b866'
      },
      colorSecondary: {
        background: '#ec1313'
      }
    },
    MuiAvatar: { // Name of the component ⚛️ / style sheet
      colorDefault: { // Name of the rule
        backgroundColor: '#0f0e11', // Some CSS
        color: '#ffffff'
      }
    },
    MuiTypography: { // Name of the component ⚛️ / style sheet
      body1: { // Name of the rule
        color: '#ffffff' // Some CSS
      }
    },
    MuiTooltip: { // Name of the component ⚛️ / style sheet
      tooltip: { // Name of the rule
        color: '#b7b7b7', // Some CSS
        backgroundColor: '#151e21',
        border: '0px solid #00aeae'
      }
    },
    MuiDivider: {
      color: '#fff'
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
    }
  }
});
