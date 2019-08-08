#!/usr/bin/env bash
args=("$@")

export ACCESS_KEY_SECRET="<alicloud>"
export ACCESS_KEY_ID="<alicloud>"
export ACCOUNT_ID="<alicloud>"
export REGION=cn-hangzhou
export TIMEOUT=600000

bazel build //${args[0]}:aliyun_zip
rm -rf $(pwd)/bazel-bin/${args[0]}/latest.aliyun/
unzip $(pwd)/bazel-bin/${args[0]}/latest.aliyun.zip -d $(pwd)/bazel-bin/${args[0]}/latest.aliyun
find $(pwd)/bazel-bin/${args[0]}/latest.aliyun/ -type f  -exec touch {} +
cd $(pwd)/bazel-bin/${args[0]}/latest.aliyun/
npm install --production
zip deploy.zip -r bundle.js node_modules/** package.json
node --max-old-space-size=8192 $(which fun) deploy --template template.aliyun.yml

cd ../../../
