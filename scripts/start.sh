#!/bin/bash

if [ ! -f "/build/config/config.js" ]; then
  cp /scripts/config-presets/config.beta.js /build/config/config.js
  echo "Config file didn't exist, copied default config."
fi

if [ ! -f "/build/build.js" ]; then
  cp /scripts/config-presets/build.js /build/build.js
  echo "First boot after build detected. Writing build data file..."
fi

sed -i "s/%version%/${VERSION}/g" /build/build.js

cd /
serve -s build
