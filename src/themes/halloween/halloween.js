import { createMuiTheme } from '@material-ui/core/styles';

import './halloween.css';

export default createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#051016'
    },
    primary: {
      main: '#fe8000',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#c34444',
      contrastText: '#ffffff'
    }
  },
  neutral: {
    color: '#ffffff'
  },
  overrides: {
    MuiPaper: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#6e8490', // Some CSS
        backgroundColor: '#071d29',
        borderRadius: '4px',
        border: '0px solid #071d29'
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
        color: '#6e8490', // Some CSS
        backgroundColor: '#0d2431', // Some CSS
        borderRadius: '15px'
      }
    },
    MuiMenuItem: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#6e8490', // Some CSS
        padding: '10px',
        '&:hover': {
          backgroundColor: '#0d2431'
        },
        '&$selected': { // Name of the rule
          backgroundColor: '#fe8000',
          color: '#ffffff',
        }
      }
    },
    MuiListItemText: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#6e8490'
      }
    },
    MuiButton: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        textTransform: 'none', // Some CSS
        color: '#6e8490', // Some CSS
        borderRadius: '50px'
      },
      containedPrimary: {
        boxShadow: 'none',
        backgroundColor: '#fe8000',
        '&$disabled': {
          background: '#071d29',
          color: '#6e8490'
        }
      },
      containedSecondary: {
        boxShadow: 'none',
        backgroundColor: '#c34444',
        '&$disabled': {
          background: '#071d29',
          color: '#6e8490'
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
        backgroundColor: '#0d2431',
        color: '#6e8490',
        '&$disabled': {
          backgroundColor: '#071d29',
          color: '#6e8490'
        },
        '&:hover': {
          backgroundColor: '#102f40'
        }
      }
    },
    MuiToggleButtonGroup: {
      root: {
        "&$selected": {
          backgroundColor: "transparent",
          boxShadow: "none"
        }
      }
    },
    MuiToggleButton: {
      label: {
        textTransform: 'none'
      },
      root: {
        '&$selected': {
          backgroundColor: '#fe8000'
        }
      }
    },
    MuiFab: {
      root: {
        boxShadow: 'none',
        backgroundColor: '#0d2431',
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: '#102f40'
        }
      }
    },
    MUIDataTableToolbar: {
      root: {
        padding: '23px'
      },
      titleText: {
        color: '#6e8490'
      },
      icon: {
        color: '#6e8490'
      }
    },
    MUIDataTableHeadCell: {
      fixedHeader: {
        backgroundColor: '#071d29',
        borderBottom: '3px solid #fe8000'
      }
    },
    MuiTableCell: { // Name of the component ⚛️ / style sheet
      body: { // Name of the rule
        color: '#6e8490', // Some CSS
        borderColor: 'transparent',
        padding: '16px'
      },
      root: {
        padding: '16px',
        borderBottom: '0px'
      }
    },
    MuiTableRow: {
      root: {
        '&:nth-of-type(even)': {
          backgroundColor: '#0d2431'
        }
      }
    },
    MuiInputAdornment: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#464646' // Some CSS
      }
    },
    MuiTabs: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#071d29', // Some CSS
        border: '0px !important',
        borderRadius: '4px',
      }
    },
    MuiTab: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        border: '0px',
        textTransform: 'none',
        color: '#6e8490'
      },
      textColorPrimary: {
        '&$selected': {
          color: '#6e8490'
        },
      }
    },
    MuiChip: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#232f4a' // Some CSS
      },
      colorPrimary: {
        backgroundColor: '#fe8000'
      },
      colorSecondary: {
        backgroundColor: '#c34444'
      }
    },
    MuiAvatar: { // Name of the component ⚛️ / style sheet
      colorDefault: { // Name of the rule
        backgroundColor: '#071d29', // Some CSS
        color: '#ffffff'
      }
    },
    MuiTypography: { // Name of the component ⚛️ / style sheet
      body1: { // Name of the rule
        color: '#6e8490' // Some CSS
      },
      body2: { // Name of the rule
        color: '#6e8490' // Some CSS
      }
    },
    MuiTooltip: { // Name of the component ⚛️ / style sheet
      tooltip: { // Name of the rule
        color: '#6e8490', // Some CSS
        backgroundColor: 'rgba(0,0,0,0.0)',
        opacity: '1'
      },
      popper: {
        opacity: '1'
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
        backgroundColor: '#0d2431',
        borderBottom: '3px solid #fe8000'
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
        backgroundColor: '#202940',
        height: '20px'
      }
    },
    MuiDialogContent: {
      root: {
        padding: '24px',
        whiteSpace: 'pre-wrap'
      }
    },
    MuiSlider: {
      markLabel: {
        filter: 'grayscale(100%)'
      },
      markLabelActive: {
        filter: 'grayscale(0%)'
      }
    },
  },
  typography: {
    useNextVariants: true
  }
});
