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
    module_name = "@serverless-di/common",
    deps = [
        "@npm//@types/node",
        "@npm//inversify",
        "@npm//aws-sdk",
        "@npm//reflect-metadata",
    ],
)
