package(default_visibility = ["//visibility:public"])
exports_files(["tsconfig.json"])


load("@com_github_bazelbuild_buildtools//buildifier:def.bzl", "buildifier")

buildifier(
    name = "buildifier",
)

buildifier(
    name = "buildifier.check",
    mode = "check",
)
