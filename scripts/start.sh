#!/bin/bash

if [ ! -f "/build/config/config.js" ]; then
  cp /scripts/config-presets/config.beta.js /build/config/config.js
  echo "Config file didn't exist, copied default config."
fi

cd /
serve -s build
