import storage from 'local-storage';

import actions from './actions';

import { authSelectors } from '../auth';
import { getUserGraph } from '../../services/graphqlService';

const { updateLanguage } = actions;

const loadLanguage = () => dispatch => {
  const languageInStorage = storage('language');

  if (languageInStorage !== null) {
    dispatch(updateLanguage(languageInStorage));
  }
};

export default {
  loadLanguage,
  updateLanguage
};
