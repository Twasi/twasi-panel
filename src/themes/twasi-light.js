import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#00aeae',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#e53935',
      contrastText: '#ffffff'
    }
  },
  overrides: {
    MuiPaper: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#3a3a3a', // Some CSS
        backgroundColor: '#ffffff',
        borderRadius: '4px'
      }
    },
    MuiCardContent: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#3a3a3a', // Some CSS
        backgroundColor: '#ffffff'
      }
    },
    MuiMenuItem: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#3a3a3a', // Some CSS
        padding: '10px',
        '&:hover': {
          backgroundColor: '#ffffff'
        }
      },
      selected: { // Name of the rule
        color: '#ffffff',
        background: 'linear-gradient(135deg,#00aeae,#02d4d4)'
      }
    },
    MuiListItemText: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: '#3a3a3a'
      }
    },
    MuiButton: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        textTransform: 'none', // Some CSS
        color: '#3a3a3a' // Some CSS
      },
      containedPrimary: {
        boxShadow: 'none',
        background: 'linear-gradient(135deg,#00aeae,#02d4d4)',
        '&$disabled': {
          background: '#f1f1f1',
          color: '#b7b7b7'
        }
      },
      containedSecondary: {
        boxShadow: 'none',
        background: 'linear-gradient(135deg,#e53935,#ff4f4a)',
        '&$disabled': {
          background: '#f1f1f1',
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
        backgroundColor: '#f1f1f1',
        color: '#b7b7b7',
        '&$disabled': {
          backgroundColor: '#f1f1f1',
          color: '#b7b7b7'
        },
        '&:hover': {
          backgroundColor: '#dcdcdc'
        }
      }
    },
    MuiTableCell: { // Name of the component ⚛️ / style sheet
      body: { // Name of the rule
        color: '#3a3a3a', // Some CSS
        borderColor: 'rgba(255, 255, 255, 0.12)'
      }
    },
    MuiInputAdornment: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#1b292d' // Some CSS
      }
    },
    MuiTabs: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        backgroundColor: '#f1f1f1', // Some CSS
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
        backgroundColor: '#f1f1f1' // Some CSS
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
        backgroundColor: '#f1f1f1', // Some CSS
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
        color: '#3a3a3a', // Some CSS
        backgroundColor: '#ffffff',
        border: '1px solid #00aeae'
      }
    }
  }
});
