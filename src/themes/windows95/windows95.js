import { createMuiTheme } from '@material-ui/core/styles';

import './windows95.css';

export default createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#008080'
    },
    primary: {
      main: '#000080',
      contrastText: '#000000'
    },
    secondary: {
      main: '#de6464',
      contrastText: '#000000'
    }
  },
  neutral: {
    color: '#da7720'
  },
  overrides: {
    MuiPaper: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: 'black', // Some CSS
        backgroundColor: '#bdbebd',
        borderRadius: '0px',
        borderWidth: '2px',
        borderColor: '#dbdbdb #535353 #535353 #dbdbdb',
        borderStyle: 'solid'
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
        color: '#000000', // Some CSS
        backgroundColor: '#bdbebd' // Some CSS
      }
    },
    MuiMenuItem: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#000000', // Some CSS
        padding: '10px',
        '&:hover': {
          backgroundColor: '#bdbebd'
        },
        '&$selected': { // Name of the rule
          color: '#ffffff',
          backgroundColor: '#000080'
        }
      }
    },
    MuiListItemText: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#000000'
      }
    },
    MuiButton: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        textTransform: 'none', // Some CSS
        color: '#ffffff', // Some CSS
        borderRadius: '0px',
        borderWidth: '2px',
        borderColor: '#dbdbdb #535353 #535353 #dbdbdb',
        borderStyle: 'solid'
      },
      fab: {
        borderRadius: '0px'
      },
      mini: {
        minHeight: '32px',
        height: '32px',
        width: '32px'
      },
      containedPrimary: {
        boxShadow: 'none',
        borderWidth: '2px',
        color: '#ffffff',
        borderColor: '#dbdbdb #535353 #535353 #dbdbdb',
        backgroundColor: '#000080',
        '&$disabled': {
          background: '#232f4a',
          color: '#ffffff'
        }
      },
      containedSecondary: {
        boxShadow: 'none',
        borderWidth: '2px',
        borderColor: '#dbdbdb #535353 #535353 #dbdbdb',
        backgroundColor: '#bdbebd',
        '&$disabled': {
          background: '#232f4a',
          color: '#000000'
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
        backgroundColor: '#bdbebd',
        color: '#ffffff',
        '&$disabled': {
          backgroundColor: '#bdbebd',
          color: '#ffffff'
        },
        '&:hover': {
          backgroundColor: '#dbdbdb'
        }
      }
    },
    MuiIconButton: {
      label: {
        color: '#000000'
      }
    },
    MuiIcon: {
      root: {
        color: '#ffffff'
      }
    },
    MuiFormHelperText: {
      root: {
        color: '#000000'
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
          backgroundColor: '#000080'
        }
      }
    },
    MuiFab: {
      root: {
        boxShadow: 'none',
        backgroundColor: '#bdbebd',
        borderRadius: '0px',
        borderWidth: '2px',
        borderColor: '#dbdbdb #535353 #535353 #dbdbdb',
        borderStyle: 'solid',
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: '#dbdbdb'
        }
      }
    },
    MUIDataTableToolbar: {
      root: {
        padding: '23px'
      },
      titleText: {
        color: '#000000'
      },
      icon: {
        color: '#000000'
      }
    },
    MUIDataTableHeadCell: {
      fixedHeader: {
        backgroundColor: '#bdbebd',
        borderBottom: '3px solid #000080'
      }
    },
    MuiTableCell: { // Name of the component ⚛️ / style sheet
      head: { // Name of the rule
        color: '#000000' // Some CSS
      },
      body: { // Name of the rule
        color: '#000000', // Some CSS
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
          backgroundColor: '#bdbebd'
        }
      }
    },
    MuiInputAdornment: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#bdbebd' // Some CSS
      }
    },
    MuiInputBase: {
      input: {
        color: '#000000'
      }
    },
    MuiOutlinedInput: {
      root: {
        backgroundColor: '#dbdbdb',
        borderWidth: '2px',
        borderColor: '#dbdbdb #535353 #535353 #dbdbdb',
        borderStyle: 'inset'
      },
      legend: {
        color: '#000000'
      }
    },
    MuiInputLabel: {
      shrink: {
        marginTop: "-10px"
      }
    },
    MuiFormLabel: {
      root: {
        color: '#000000'
      }
    },
    MuiTabs: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#bdbebd', // Some CSS
        border: '0px !important',
        borderRadius: '0px'
      }
    },
    MuiTab: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        border: '0px',
        borderRadius: '0px',
        color: '#000000',
        textTransform: 'none'
      },
      textColorPrimary: {
        '&$selected': {
          color: '#000000'
        },
      }
    },
    MuiChip: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#bdbebd', // Some CSS
        borderWidth: '2px',
        borderColor: '#dbdbdb #535353 #535353 #dbdbdb',
        borderStyle: 'solid',
        borderRadius: '0px'
      },
      colorPrimary: {
        backgroundColor: '#000080',
        color: '#ffffff'
      },
      colorSecondary: {
        backgroundColor: '#bdbebd',
        color: '#000000'
      },
      avatar: {
        color: '#000000'
      }
    },
    MuiAvatar: { // Name of the component ⚛️ / style sheet
      colorDefault: { // Name of the rule
        backgroundColor: 'rgba(204, 204, 204, 0)', // Some CSS
        color: '#000000'
      }
    },
    MuiTypography: { // Name of the component ⚛️ / style sheet
      colorInherit: {
        color: '#000000'
      },
      colorTextSecondary: {
        color: '#000000'
      },
      body1: { // Name of the rule
        color: '#000000' // Some CSS
      },
      body2: { // Name of the rule
        color: '#000000' // Some CSS
      }
    },
    MuiTooltip: { // Name of the component ⚛️ / style sheet
      tooltip: { // Name of the rule
        color: '#ffffff', // Some CSS
        backgroundColor: 'rgba(0,0,0,1)',
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
        borderBottom: '0px',
        borderRadius: '0px'
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.7)'
      },
      outlined: {
        borderRadius: '0px'
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        borderRadius: '0px',
        backgroundColor: '#bdbebd',
        borderBottom: '3px solid #000080'
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
      root: {
        borderWidth: '2px',
        borderColor: '#dbdbdb #535353 #535353 #dbdbdb',
        borderStyle: 'inset'
      },
      colorPrimary: {
        backgroundColor: '#dbdbdb',
        height: '20px'
      }
    },
    MuiDialogContent: {
      root: {
        padding: '24px'
      }
    }
  },
  typography: {
    useNextVariants: true
  }
});
