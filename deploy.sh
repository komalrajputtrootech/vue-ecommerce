#!/usr/bin/env sh

set -e

npm run build

cd dist

sudo git add -A
sudo git commit -m "deployment"
sudo git push origin dev
cd -
