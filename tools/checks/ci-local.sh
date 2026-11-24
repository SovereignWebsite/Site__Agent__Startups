#!/bin/bash
# Run the Factory CI checks locally on one brochure repository: tools/checks/ci-local.sh /home/user/site__startups__sgit
# Needs html-validate, axe-core and @axe-core/playwright installed in $CITOOLS (npm install there once).
S=$1; CITOOLS=${CITOOLS:-$HOME/citools}
cd "$S" || exit 1
node .github/ci/build.mjs >/dev/null && echo "build ok"
node .github/ci/share-check.mjs _site | tail -3
node .github/ci/quality.mjs _site >/dev/null; echo "quality exit $?"
NODE_PATH=$CITOOLS/node_modules $CITOOLS/node_modules/.bin/html-validate --config .github/ci/htmlvalidate.json "_site/**/*.html" | tail -25; echo "htmlvalidate exit ${PIPESTATUS[0]}"
ln -sfn $CITOOLS/node_modules node_modules; node .github/ci/axe.mjs _site | grep -v passed; echo "axe exit ${PIPESTATUS[0]}"; rm -f node_modules; rm -rf _site
