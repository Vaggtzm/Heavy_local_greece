#!/bin/bash

#
# Copyright (c) 2024. MIT License
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#

# Propose a new release version
RELEASE=$(sentry-cli releases propose-version)

# Check if the .env file contains REACT_APP_RELEASE
if grep -q "^REACT_APP_RELEASE=" .env; then
  # Update the existing REACT_APP_RELEASE line
  sed -i.bak "s/^REACT_APP_RELEASE=.*/REACT_APP_RELEASE=$RELEASE/" .env
else
  # Add the REACT_APP_RELEASE line if it does not exist
  echo "REACT_APP_RELEASE=$RELEASE" >> .env
fi