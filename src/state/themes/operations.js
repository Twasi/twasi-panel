import actions from './actions';
//import selectors from './selectors';

import {getGraph} from '../../services/graphqlService';

const {
    updateThemes,
    updateInstalledThemes,
    updateThemeResponse,
    updateAddTheme,
    updatePagination,
    updateLoaded,
    updateLoading,
    updateActionSuccess,
    setInstalled,
    updateActionInProgress
} = actions;

const loadThemes = (page, approvedOnly) => dispatch => {
    dispatch(updateLoading(true));
    dispatch(getGraph(`themes{availableThemes(approvedOnly: ${approvedOnly}){content(page: 1){approved,created,creator,id,installed,name,theme{backgroundColor,buttonFontColor,buttonRadius,fontColor,mainTextLogo,outlineTextLogo,panelBackgroundColor,panelRadius,primaryColor,secondaryColor,shadowPrimaryTextLogo,shadowSecondaryTextLogo,specialContentColor,specialContentRadius}},itemsPerPage,total,pages}}`, 'panel')).then(data => {
        dispatch(updateThemes(data.themes.availableThemes.content.map(p => ({ ...p, actionInProgress: false }))));
        dispatch(updatePagination(data.themes.availableThemes));
    }).finally(() => {
        dispatch(updateLoading(false))
        dispatch(updateLoaded(true))
    });
};

const loadInstalledThemes = () => dispatch => {
    dispatch(updateLoading(true));
    dispatch(getGraph(`themes{installedThemes{approved,created,creator,id,installed,name,theme{backgroundColor,buttonFontColor,buttonRadius,fontColor,mainTextLogo,outlineTextLogo,panelBackgroundColor,panelRadius,primaryColor,secondaryColor,shadowPrimaryTextLogo,shadowSecondaryTextLogo,specialContentColor,specialContentRadius}}}`, 'panel')).then(data => {
        dispatch(updateInstalledThemes(data.themes.installedThemes));
    }).finally(() => {
        dispatch(updateLoading(false))
        dispatch(updateLoaded(true))
    });
};

const addTheme = (name, themedata) => dispatch => {
    var theme = "";
    for (var key in themedata) {
      if (themedata.hasOwnProperty(key)) {
        if (isNaN(themedata[key])) {
          theme += key+':"'+themedata[key]+'",';
        } else {
          theme += key+':'+themedata[key]+',';
        }
      }
    }
    theme = theme.substring(0, theme.length - 1);
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`themes{create(name: ${JSON.stringify(name)}, theme: {${theme}}){status,translationKey}}`, 'panel')).then(
    data => {
      dispatch(updateThemeResponse(data.themes.create));
      dispatch(updateAddTheme(data.themes));
      dispatch(updateActionSuccess(true));
    }).finally(() => {
      dispatch(updateActionSuccess(false));
    });
};

const installTheme = id => dispatch => {
  dispatch(updateActionInProgress(id, true));
  dispatch(updateActionSuccess(false));
  sleep(getRndInteger(500, 1000)).then(() => {

    dispatch(getGraph(`themes{install(themeId: ${JSON.stringify(id)}){status,translationKey}}`, 'panel')).then(data => {
      dispatch(setInstalled(id, data.themes.install.status === 'OK' ? true : false));
      dispatch(updateActionInProgress(id, false));
      dispatch(updateActionSuccess(true));
    }).finally(() => {
      dispatch(updateActionSuccess(false));
    });
  });
};

const uninstallTheme = id => dispatch => {
  dispatch(updateActionInProgress(id, true));
  dispatch(updateActionSuccess(false));
  sleep(getRndInteger(500, 1000)).then(() => {

    dispatch(getGraph(`themes{uninstall(themeId: ${JSON.stringify(id)}){status,translationKey}}`, 'panel')).then(data => {
      dispatch(setInstalled(id, data.themes.uninstall.status === 'OK' ? false : true));
      dispatch(updateActionInProgress(id, false));
      dispatch(updateActionSuccess(true));
    }).finally(() => {
      dispatch(updateActionSuccess(false));
    });
  });
};

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
    loadThemes,
    loadInstalledThemes,
    addTheme,
    updateThemeResponse,
    updateLoaded,
    updateLoading,
    updatePagination,
    updateActionSuccess,
    installTheme,
    uninstallTheme
};
