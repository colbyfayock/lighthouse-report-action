#!/bin/sh -l

AUDIT_URL=$1

npm install -g lighthouse

node dist/index.js
