#!/bin/sh
#
# Grommet won't build on rails' asset pipeline.
# This fix is neccessary until this PR is merged.
# https://github.com/grommet/grommet/pull/1821

BUGGY_FILE="$PWD/node_modules/grommet/scss/grommet-core/_objects.animate.scss"

sed -i 's/^&//' $BUGGY_FILE
