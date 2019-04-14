import types from './types';

const updateImpersonating = (userName, jwt) => ({
  type: types.UPDATE_IMPERSONATING,
  jwt,
  userName
});

export default {
  updateImpersonating
};
