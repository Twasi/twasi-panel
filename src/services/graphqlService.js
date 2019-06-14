import fetch from './fetch';
import { authSelectors } from '../state/auth';
import { appInfoOperations } from "../state/appInfo";

const getRawGraph = query => fetch(window.env.GRAPHQL_URL, 'post', `query=${encodeURI(query)}`);

const getGraph = (query, target, jwt) => (dispatch, getState) => {
  if (!jwt && getState) {
    const state = getState();
    jwt = authSelectors.getJwt(state);
  }

  if (jwt === null) {
    // eslint-disable-next-line
    console.log('Not authenticated, could not do request.');
    return null;
  }
  const actualTarget = target == null ? 'panel' : target;
  return new Promise((resolve, reject) => {
    getRawGraph(`query{${actualTarget}(token:"${jwt}"){${query}}}`).then(data => {
      if (data.errors) {
        // Something went wrong.
        const error = data.errors[0];

        const notification = {
          type: 'error',
          origin: 'API_REQUEST',
          message: error.message
        };

        console.log(error);

        if (error.extensions && error.extensions.localisedKey) {
          // LocalisedKey provided by backend
          notification.localKey = error.extensions.localisedKey
        }

        // Store in state
        dispatch(appInfoOperations.addNotification(notification));

        // Reject the request
        return reject(error);
      }
      return resolve(data.data[actualTarget]);
    });
  });
};

export { getGraph, getRawGraph };
export default getGraph;
