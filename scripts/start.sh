#!/bin/sh

if [ "$NODE_ENV" == "production" ] ; then
  npm run preview
else
  npm run dev
fi
