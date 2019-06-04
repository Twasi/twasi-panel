import { createMuiTheme } from '@material-ui/core/styles';

import './tipeee-dark.css';

export default createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#272b37'
    },
    primary: {
      main: '#7885a5',
      contrastText: 'rgba(255, 255, 255, 0.7)'
    },
    secondary: {
      main: '#e53935',
      contrastText: 'rgba(255, 255, 255, 0.7)'
    }
  },
  neutral: {
    color: '#da7720'
  },
  overrides: {
    MuiPaper: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#ced3df', // Some CSS
        backgroundColor: '#3b4254',
        borderRadius: '4px',
        border: '0px solid #25373e'
      },
      elevation1: {
        boxShadow: 'none'
      },
      elevation2: {
        boxShadow: 'none'
      },
      elevation3: {
        boxShadow: 'none'
      },
      elevation4: {
        boxShadow: 'none'
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
        color: '#ced3df', // Some CSS
        backgroundColor: '#474e62' // Some CSS
      }
    },
    MuiMenuItem: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#c0c0cc', // Some CSS
        padding: '10px',
        '&:hover': {
          backgroundColor: '#222631'
        }
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
        color: 'rgba(255, 255, 255, 0.7)', // Some CSS
        borderRadius: '4px'
      },
      mini: {
        minHeight: '32px',
        height: '32px',
        width: '32px'
      },
      containedPrimary: {
        boxShadow: 'none',
        backgroundColor: '#7885a5',
        '&$disabled': {
          background: '#272b37',
          color: '#b7b7b7'
        }
      },
      containedSecondary: {
        boxShadow: 'none',
        background: 'linear-gradient(135deg,#e53935,#ff4f4a)',
        '&$disabled': {
          background: '#272b37',
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
        backgroundColor: '#474e62',
        color: 'rgba(255, 255, 255, 0.7)',
        '&$disabled': {
          backgroundColor: '#474e62',
          color: 'rgba(255, 255, 255, 0.7)'
        },
        '&:hover': {
          backgroundColor: '#222631'
        }
      }
    },
    MuiFab: {
      root: {
        boxShadow: 'none',
        backgroundColor: '#474e62',
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: '#222631'
        }
      }
    },
    MUIDataTableToolbar: {
      root: {
        padding: '23px'
      },
      titleText: {
        color: '#ced3df'
      },
      icon: {
        color: '#ced3df'
      }
    },
    MUIDataTableHeadCell: {
      fixedHeader: {
        backgroundColor: '#3b4254',
        borderBottom: '3px solid #7885a5'
      }
    },
    MuiTableCell: { // Name of the component ⚛️ / style sheet
      body: { // Name of the rule
        color: '#ced3df', // Some CSS
        borderColor: 'transparent',
        padding: '16px'
      },
      root: {
        padding: '16px'
      }
    },
    MuiTableRow: {
      root: {
        '&:nth-of-type(even)': {
          backgroundColor: '#474e62'
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
        backgroundColor: '#3b4254', // Some CSS
        border: '0px !important',
        borderRadius: '4px'
      }
    },
    MuiTab: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        border: '0px'
      },
      label: {
        color: '#ced3df',
        textTransform: 'none'
      }
    },
    MuiChip: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#474e62' // Some CSS
      },
      colorPrimary: {
        backgroundColor: '#7885a5'
      },
      colorSecondary: {
        background: 'linear-gradient(135deg,#e53935,#ff4f4a)'
      }
    },
    MuiAvatar: { // Name of the component ⚛️ / style sheet
      colorDefault: { // Name of the rule
        backgroundColor: '#222631', // Some CSS
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
    MuiTypography: { // Name of the component ⚛️ / style sheet
      body1: { // Name of the rule
        color: '#ced3df' // Some CSS
      }
    },
    MuiTooltip: { // Name of the component ⚛️ / style sheet
      tooltip: { // Name of the rule
        color: '#ced3df', // Some CSS
        backgroundColor: 'rgba(0,0,0,0.0)',
        opacity: '1'
      },
      popper: {
        opacity: '1'
      }
    },
    MuiSlider: {
      track: {
        backgroundColor: '#fff'
      },
      thumb: {
        backgroundColor: '#fff'
      }
    },
    MuiSelect: {
      root: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.875em',
        borderBottom: '0px'
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        borderRadius: '4px 4px 0px 0px',
        backgroundColor: '#474e62',
        borderBottom: '3px solid #7885a5'
      }
    },
    MuiExpansionPanel: {
      root: {
        '&:before': {
          display: 'none'
        }
      }
    },
    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: '#3b4254',
        height: '20px'
      }
    }
  },
  typography: {
    useNextVariants: true
  }
});
