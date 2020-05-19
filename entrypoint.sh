#!/bin/sh -l

AUDIT_URL=$1

npm install -g lighthouse

mkdir -p reports

node dist/index.js
