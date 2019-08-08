args=("$@")

bazel build //...
rm -rf $(pwd)/bazel-bin/${args[0]}/latest/
unzip $(pwd)/bazel-bin/${args[0]}/latest.zip -d $(pwd)/bazel-bin/${args[0]}/latest
find $(pwd)/bazel-bin/${args[0]}/latest/ -type f  -exec touch {} +
aws cloudformation package --template-file $(pwd)/bazel-bin/${args[0]}/latest/template.yml --output-template-file $(pwd)/bazel-bin/${args[0]}/latest/package.yml --s3-bucket test-bucket-istark --profile ${args[1]}
aws cloudformation deploy --template-file $(pwd)/bazel-bin/${args[0]}/latest/package.yml --stack-name ${args[0]} --s3-bucket test-bucket-istark --capabilities CAPABILITY_IAM --profile ${args[1]}
