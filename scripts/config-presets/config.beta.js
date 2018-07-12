/*
 Example Configuration file for Twasi frontend.
 Needs to be placed in 'public/config.js' before the build
 Or 'build/config.js afterwards.'
*/
window.env = {
  ...window.env,
  AUTH_URL: 'https://api-beta.twasi.net/auth',
  GRAPHQL_URL: 'https://api-beta.twasi.net/apis'
};
