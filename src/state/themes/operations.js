import actions from './actions';
//import selectors from './selectors';

import {getGraph} from '../../services/graphqlService';

const {
    updateThemes,
    updatePagination,
    updateLoaded,
    updateLoading,
    updateActionSuccess
} = actions;

const loadThemes = page => dispatch => {
    dispatch(updateLoading(true));
    dispatch(getGraph(`themes{availableThemes(approvedOnly: false){content(page: 1){approved,created,creator,id,installed,name,theme{backgroundColor,buttonFontColor,buttonRadius,fontColor,mainTextLogo,outlineTextLogo,panelBackgroundColor,panelRadius,primaryColor,secondaryColor,shadowPrimaryTextLogo,shadowSecondaryTextLogo,specialContentColor,specialContentRadius}},itemsPerPage,total,pages}}`, 'panel')).then(data => {
        dispatch(updateThemes(data.themes.availableThemes.content));
        dispatch(updatePagination(data.themes.availableThemes));
    }).finally(() => {
        dispatch(updateLoading(false))
        dispatch(updateLoaded(true))
    });
};

export default {
    loadThemes,
    updateLoaded,
    updateLoading,
    updatePagination,
    updateActionSuccess
};
