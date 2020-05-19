#!/bin/sh -l

AUDIT_URL=$1

mkdir -p reports

node dist/index.js
