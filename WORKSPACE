workspace(name = "serverlessDi")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

###############################
##### NODEJS BUILD SETUP ######
###############################
# Fetch bazel_Skylib Required for bundlling
http_archive(
    name = "bazel_skylib",
    sha256 = "2ef429f5d7ce7111263289644d233707dba35e39696377ebab8b0bc701f7818e",
    type = "tar.gz",
    url = "https://github.com/bazelbuild/bazel-skylib/releases/download/0.8.0/bazel-skylib.0.8.0.tar.gz",
)

load("@bazel_skylib//:workspace.bzl", "bazel_skylib_workspace")

bazel_skylib_workspace()

# Fetch Buildtools rule
http_archive(
    name = "com_github_bazelbuild_buildtools",
    sha256 = "9cc28ec197bab3ea0c6830b04e2e066610de03b13dd5cdcc7c9cb51c114eda40",
    strip_prefix = "buildtools-f42fd8fb92a30a55f5e53681975a3d773df8ec7b",
    url = "https://github.com/bazelbuild/buildtools/archive/f42fd8fb92a30a55f5e53681975a3d773df8ec7b.zip",
)

load("@com_github_bazelbuild_buildtools//buildifier:deps.bzl", "buildifier_dependencies")

# Fetch nodejs rule
http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "1db950bbd27fb2581866e307c0130983471d4c3cd49c46063a2503ca7b6770a4",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/0.29.0/rules_nodejs-0.29.0.tar.gz"],
)

load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories", "npm_install")

node_repositories(
    package_json = [
        "//:package.json",
    ],
)

npm_install(
    name = "npm",
    package_json = "//:package.json",
    package_lock_json = "//:package-lock.json",
)

load("@build_bazel_rules_nodejs//:defs.bzl", "check_bazel_version")

check_bazel_version("0.25.0", "This Project requires minimum bazel version of 0.25.0")

load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")

install_bazel_dependencies()

load("@npm_bazel_typescript//:index.bzl", "check_rules_typescript_version")

check_rules_typescript_version("0.25.0")

###############################
##### GO BUILD SETUP ##########
###############################
# Required by Buildifier
http_archive(
    name = "io_bazel_rules_go",
    sha256 = "301c8b39b0808c49f98895faa6aa8c92cbd605ab5ad4b6a3a652da33a1a2ba2e",
    urls = ["https://github.com/bazelbuild/rules_go/releases/download/0.18.0/rules_go-0.18.0.tar.gz"],
)

http_archive(
    name = "bazel_gazelle",
    sha256 = "be9296bfd64882e3c08e3283c58fcb461fa6dd3c171764fcc4cf322f60615a9b",
    urls = ["https://github.com/bazelbuild/bazel-gazelle/releases/download/0.18.1/bazel-gazelle-0.18.1.tar.gz"],
)

load("@io_bazel_rules_go//go:deps.bzl", "go_register_toolchains", "go_rules_dependencies")

go_rules_dependencies()

go_register_toolchains()
