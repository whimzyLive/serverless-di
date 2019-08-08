args=("$@")
bazel build //...
rm -rf $(pwd)/bazel-bin/${args[0]}/latest/
unzip $(pwd)/bazel-bin/${args[0]}/latest.zip -d $(pwd)/bazel-bin/${args[0]}/latest
find $(pwd)/bazel-bin/${args[0]}/latest/ -type f  -exec touch {} +
cd $(pwd)/bazel-bin/${args[0]}/latest/main
npm install --production
npm rebuild grpc --target=8.10.0 --target_arch=x64 --target_platform=linux --target_libc=glibc
cd ../
sam local start-api

