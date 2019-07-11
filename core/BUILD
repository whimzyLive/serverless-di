package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "library",
    srcs = glob(
        [
            "src/**/*.ts",
            "index.ts",
        ],
        exclude = [
            "src/**/*.test.ts",
            "src/**/*.spec.ts",
            "src/**/*.e2e.ts",
        ],
    ),
    module_name = "@serverless-di/core",
    deps = [
        "//common:library",
        "@npm//@types/node",
        "@npm//inversify",
        "@npm//reflect-metadata",
        "@npm//base-64",
        "@npm//utf8"
    ],
)
