import { getState } from '../state/store';
import { authSelectors } from '../state/auth';

const requestHeaders = token => ({
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
});

export default async (url, method, payload) => {
  const state = getState();

  const user = authSelectors.getUser(state);
  const token = authSelectors.getJwt(state);
  if (user === null || token === null) {
    throw new Error('User is not authenticated - request failed.');
  }

  const options = {
    method,
    headers: requestHeaders(token),
    body: method !== 'GET' ? payload : undefined
  };

  const response = await fetch(url, options);
  if (response.status === 204) {
    return {};
  }

  const body = await response.json();

  if (response.status >= 300) {
    const error = new Error(body.message);
    error.response = body;
    error.status = response.status;
    throw error;
  }

  return body;
};
