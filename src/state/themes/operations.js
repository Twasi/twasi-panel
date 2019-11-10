import actions from './actions';
//import selectors from './selectors';

import {getGraph} from '../../services/graphqlService';

const {
    updateThemes,
    updateApprove,
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

const approve = id => dispatch => {
    dispatch(updateLoading(true));
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`themes{approve(themeId: ${JSON.stringify(id)}){status,translationKey}}`, 'panel')).then(data => {
        dispatch(updateApprove(data.themes.approve));
        dispatch(updateActionSuccess(true));
    }).finally(() => {
        dispatch(updateLoading(false))
        dispatch(updateActionSuccess(false));
        dispatch(updateLoaded(true))
    });
};


const loadThemes = (page, approvedOnly) => dispatch => {
    dispatch(updateLoading(true));
    dispatch(getGraph(`themes{availableThemes(approvedOnly: ${approvedOnly}){content(page: ${page}){approved,created,creator,id,installed,name,installations,theme{backgroundColor,buttonFontColor,buttonRadius,fontColor,mainTextLogo,outlineTextLogo,panelBackgroundColor,panelRadius,primaryColor,secondaryColor,shadowPrimaryTextLogo,shadowSecondaryTextLogo,specialContentColor,specialContentRadius,darkMode,specialProperties{snow}}},itemsPerPage,total,pages}}`, 'panel')).then(data => {
        dispatch(updateThemes(data.themes.availableThemes.content.map(p => ({ ...p, actionInProgress: false }))));
        dispatch(updatePagination(data.themes.availableThemes));
    }).finally(() => {
        dispatch(updateLoading(false))
        dispatch(updateLoaded(true))
    });
};

const loadInstalledThemes = () => dispatch => {
    dispatch(updateLoading(true));
    dispatch(getGraph(`themes{installedThemes{approved,created,creator,id,installed,name,installations,theme{backgroundColor,buttonFontColor,buttonRadius,fontColor,mainTextLogo,outlineTextLogo,panelBackgroundColor,panelRadius,primaryColor,secondaryColor,shadowPrimaryTextLogo,shadowSecondaryTextLogo,specialContentColor,specialContentRadius,darkMode,specialProperties{snow}}}}`, 'panel')).then(data => {
        dispatch(updateInstalledThemes(data.themes.installedThemes));
    }).finally(() => {
        dispatch(updateLoading(false))
        dispatch(updateLoaded(true))
    });
};

function stringify(obj_from_json){
    if(typeof obj_from_json !== "object" || Array.isArray(obj_from_json)){
        // not an object, stringify using native function
        return JSON.stringify(obj_from_json);
    }
    // Implements recursive object serialization according to JSON spec
    // but without quotes around the keys.
    let props = Object
        .keys(obj_from_json)
        .map(key => `${key}:${stringify(obj_from_json[key])}`)
        .join(",");
    return `{${props}}`;
}

const addTheme = (name, themedata) => dispatch => {
    dispatch(updateActionSuccess(false));
    dispatch(getGraph(`themes{create(name: ${JSON.stringify(name)}, theme: ${stringify(themedata)}){status,translationKey}}`, 'panel')).then(
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
    approve,
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
