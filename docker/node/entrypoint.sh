#!/bin/sh

if [ ! -d "/usr/src/app/node_modules" ]; then
    npm install
fi

exec "$@"