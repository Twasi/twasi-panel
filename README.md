# Twasi Panel

[![Build Status](https://travis-ci.org/Twasi/twasi-panel.svg?branch=master)](https://travis-ci.org/Twasi/twasi-panel)

This is the management bord for the Twitch Bot. You can control, enable, disable and manage plugins
here.

## Set up

Clone the repo and issue `yarn` or `npm install`. In the public directory, create a folder "config"
with the file "config.js" in it.

Paste this into the file:

```javascript
window.env = {
  ...window.env,
  API_URL: 'https://api-beta.twasi.net/api',
  AUTH_URL: 'https://api-beta.twasi.net/auth',
  GRAPHQL_URL: 'https://api-beta.twasi.net/graphql'
};
```

You can also adapt it to use the local backend (if it is running on your machine):

```javascript
window.env = {
  ...window.env,
  API_URL: 'http://localhost:8000/api',
  AUTH_URL: 'http://localhost:8000/auth',
  GRAPHQL_URL: 'http://localhost:8000/graphql'
};
```
