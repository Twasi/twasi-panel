import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

export function shadeColor(color, percent) {
  var R = parseInt(color.substring(1,3),16);
  var G = parseInt(color.substring(3,5),16);
  var B = parseInt(color.substring(5,7),16);
  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);
  R = (R<255)?R:255;
  G = (G<255)?G:255;
  B = (B<255)?B:255;
  var RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
  var GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
  var BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));
  return "#"+RR+GG+BB;
};

export function loadCustomCss(theme) {
  if(theme !== '') {
    return(
      <style type="text/css">
        {`
          .img {
            pointer-events: none;
          }
          .translucentBox {
            background: ${theme.theme.primaryColor};
          }
          .translucentBoxLeaderboard {
            background: ${theme.theme.primaryColor};
          }
          .translucentBoxText {
            color: ${theme.theme.buttonFontColor};
          }
          .translucentBoxWelcome {
            background: ${theme.theme.primaryColor};
          }
          .headerMenuItem {
            background: ${theme.theme.primaryColor};
          }
          .TableRow {
            border-bottom: 3px solid ${theme.theme.primaryColor} !important;
          }
          .bannerHeader {
            background-color: ${shadeColor(theme.theme.backgroundColor, -40)};
          }
          .bannerHeaderTopBar {
            background: ${theme.theme.primaryColor};
          }
          .themeIcon:hover{
            background: ${theme.theme.primaryColor};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          a {
            color: ${theme.theme.primaryColor} !important;
          }
          .urlshortener_arrow {
            color: ${theme.theme.primaryColor};
          }
          .chatBubbleSelf {
            background-color: ${shadeColor(theme.theme.specialContentColor, 20)};
            padding: 10px;
            border-radius: 4px;
          }
          .chatBubbleSupport {
            background-color: ${shadeColor(theme.theme.specialContentColor, -20)};
            padding: 10px;
            border-radius: 4px;
          }
          .tooltipAccountSwitch {
            background-color: ${theme.theme.primaryColor};
          }
          .actionButtons {
            color: ${theme.theme.buttonFontColor};
          }
          .headerMenuTitle {
            color: ${theme.theme.buttonFontColor} !important;
          }
        `}
      </style>
    )
  } else {
    return;
  }
};

export function loadCustomOverrides(installedtheme) {
  return(
    createMuiTheme({
      palette: {
        type: installedtheme.theme.darkMode ? 'dark' : 'light',
        background: {
          default: installedtheme.theme.backgroundColor
        },
        primary: {
          main: installedtheme.theme.primaryColor,
          contrastText: '#ffffff'
        },
        secondary: {
          main: installedtheme.theme.secondaryColor,
          contrastText: '#ffffff'
        }
      },
      overrides: {
        MuiPaper: { // Name of the component ⚛️ / style sheet
          root: { // Name of the rule
            color: installedtheme.theme.fontColor, // Some CSS
            backgroundColor: installedtheme.theme.panelBackgroundColor,
            borderRadius: installedtheme.theme.panelRadius+'px',
            border: '0px solid '+installedtheme.theme.backgroundColor
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
            color: installedtheme.theme.fontColor, // Some CSS
            backgroundColor: installedtheme.theme.specialContentColor, // Some CSS
            borderRadius: installedtheme.theme.specialContentRadius+'px'
          }
        },
        MuiMenuItem: { // Name of the component ⚛️ / style sheet
          root: { // Name of the rule
            color: installedtheme.theme.fontColor, // Some CSS
            padding: '10px',
            '&:hover': {
              backgroundColor: shadeColor(installedtheme.theme.panelBackgroundColor, -20)
            },
            '&$selected': { // Name of the rule
              color: installedtheme.theme.buttonFontColor,
              background: installedtheme.theme.primaryColor,
              '&:hover': {
                backgroundColor: shadeColor(installedtheme.theme.primaryColor, -20)
              },
            }
          }
        },
        MuiListItemText: { // Name of the component ⚛️ / style sheet
          root: { // Name of the rule
            color: installedtheme.theme.fontColor
          }
        },
        MuiButton: { // Name of the component ⚛️ / style sheet
          root: { // Name of the rule
            textTransform: 'none', // Some CSS
            color: installedtheme.theme.buttonFontColor, // Some CSS
            borderRadius: installedtheme.theme.buttonRadius+'px'
          },
          containedPrimary: {
            color: installedtheme.theme.buttonFontColor,
            boxShadow: 'none',
            background: installedtheme.theme.primaryColor,
            '&$disabled': {
              background: installedtheme.theme.backgroundColor,
              color: installedtheme.theme.buttonFontColor
            },
            '&:hover': {
              background: shadeColor(installedtheme.theme.primaryColor, -20),
            }
          },
          containedSecondary: {
            color: installedtheme.theme.buttonFontColor,
            boxShadow: 'none',
            background: installedtheme.theme.secondaryColor,
            '&$disabled': {
              background: installedtheme.theme.backgroundColor,
              color: installedtheme.theme.buttonFontColor
            },
            '&:hover': {
              background: shadeColor(installedtheme.theme.secondaryColor, -20),
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
            backgroundColor: shadeColor(installedtheme.theme.panelBackgroundColor, -30),
            color: installedtheme.theme.fontColor,
            '&$disabled': {
              backgroundColor: installedtheme.theme.backgroundColor,
              color: installedtheme.theme.fontColor
            },
            '&:hover': {
              backgroundColor: shadeColor(installedtheme.theme.panelBackgroundColor, -40)
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
              background: installedtheme.theme.primaryColor
            }
          }
        },
        MuiFab: {
          root: {
            color: installedtheme.theme.buttonFontColor,
            backgroundColor: 'transparent',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: installedtheme.theme.panelBackgroundColor
            }
          },
          primary: {
            color: installedtheme.theme.buttonFontColor,
            background: installedtheme.theme.primaryColor,
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: shadeColor(installedtheme.theme.primaryColor, -20)
            }
          },
          secondary: {
            color: installedtheme.theme.buttonFontColor,
            background: installedtheme.theme.secondaryColor,
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: shadeColor(installedtheme.theme.secondaryColor, -20)
            }
          },
        },
        MUIDataTableToolbar: {
          root: {
            padding: '23px'
          },
          titleText: {
            color: installedtheme.theme.fontColor
          },
          icon: {
            color: installedtheme.theme.fontColor
          }
        },
        MUIDataTableHeadCell: {
          fixedHeader: {
            backgroundColor: installedtheme.theme.panelBackgroundColor,
            borderBottom: '3px solid '+installedtheme.theme.primaryColor
          }
        },
        MuiTableCell: { // Name of the component ⚛️ / style sheet
          head: {
            color: installedtheme.theme.fontColor
          },
          body: { // Name of the rule
            color: installedtheme.theme.fontColor, // Some CSS
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
              backgroundColor: installedtheme.theme.specialContentColor
            }
          }
        },
        MuiInputAdornment: { // Name of the component ⚛️ / style sheet
          root: { // Name of the rule
            backgroundColor: installedtheme.theme.backgroundColor // Some CSS
          }
        },
        MuiTabs: { // Name of the component ⚛️ / style sheet
          root: { // Name of the rule
            backgroundColor: installedtheme.theme.panelBackgroundColor, // Some CSS
            border: '0px !important',
            borderRadius: installedtheme.theme.panelRadius+'px',
          }
        },
        MuiTab: { // Name of the component ⚛️ / style sheet
          root: { // Name of the rule
            border: '0px',
            textTransform: 'none',
            color: installedtheme.theme.fontColor
          },
          textColorPrimary: {
            '&$selected': {
              color: installedtheme.theme.fontColor
            },
          }
        },
        MuiChip: { // Name of the component ⚛️ / style sheet
          root: { // Name of the rule
            backgroundColor: installedtheme.theme.panelBackgroundColor // Some CSS
          },
          colorPrimary: {
            color: installedtheme.theme.buttonFontColor,
            background: installedtheme.theme.primaryColor
          },
          colorSecondary: {
            color: installedtheme.theme.buttonFontColor,
            background: installedtheme.theme.secondaryColor
          }
        },
        MuiAvatar: { // Name of the component ⚛️ / style sheet
          colorDefault: { // Name of the rule
            backgroundColor: installedtheme.theme.panelBackgroundColor, // Some CSS
            color: installedtheme.theme.fontColor
          }
        },
        MuiTypography: { // Name of the component ⚛️ / style sheet
          body1: { // Name of the rule
            color: installedtheme.theme.fontColor // Some CSS
          },
          body2: { // Name of the rule
            color: installedtheme.theme.fontColor // Some CSS
          }
        },
        MuiTooltip: { // Name of the component ⚛️ / style sheet
          tooltip: { // Name of the rule
            color: installedtheme.theme.fontColor, // Some CSS
            backgroundColor: 'rgba(0,0,0,0.0)',
            opacity: '1'
          },
          popper: {
            opacity: '1'
          }
        },
        MuiSelect: {
          root: {
            color: installedtheme.theme.fontColor,
            fontSize: '0.875em',
            borderBottom: '0px'
          },
          icon: {
            color: installedtheme.theme.fontColor
          }
        },
        MuiExpansionPanelSummary: {
          root: {
            borderRadius: '4px 4px 0px 0px',
            backgroundColor: installedtheme.theme.specialContentColor,
            borderBottom: '3px solid '+installedtheme.theme.primaryColor
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
            backgroundColor: installedtheme.theme.primaryColor,
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
    })
  )
}
