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
        color: '#b7b7b7', // Some CSS
        backgroundColor: '#19171c',
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
    MuiFab: {
      root: {
        boxShadow: 'none',
        backgroundColor: '#232127',
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: '#0f0e11'
        }
      }
    },
    MUIDataTableToolbar: {
      root: {
        padding: '23px',
      },
      titleText: {
        color: '#b7b7b7'
      },
      icon: {
        color: '#b7b7b7'
      },
    },
    MUIDataTableHeadCell: {
      fixedHeader: {
        backgroundColor: '#19171c',
        borderBottom: '3px solid #5f459a',
      },
    },
    MuiTableCell: { // Name of the component ⚛️ / style sheet
      body: { // Name of the rule
        color: '#b7b7b7', // Some CSS
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
        backgroundColor: '#19171c', // Some CSS
        border: '0px !important'
      }
    },
    MuiTab: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        border: '0px'
      },
      label: {
        color: '#b7b7b7',
        textTransform: 'none'
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
        color: '#b7b7b7' // Some CSS
      }
    },
    MuiTooltip: { // Name of the component ⚛️ / style sheet
      tooltip: { // Name of the rule
        color: '#ffffff', // Some CSS
        backgroundColor: 'rgba(0,0,0,0.0)',
        opacity: '1',
      },
      popper: {
        opacity: '1',
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
    },
    MuiExpansionPanelSummary: {
      root: {
        borderRadius: '4px 4px 0px 0px',
        backgroundColor: '#232127',
        borderBottom: '3px solid #5f459a'
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
        backgroundColor: '#19171c',
        height: '20px'
      }
    }
  }
});
