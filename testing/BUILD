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
    module_name = "@serverless-di/testing",
    deps = [
        "//common:library",
        "//core:library",
        "@npm//@types/node",
        "@npm//inversify",
        "@npm//reflect-metadata",
    ],
)
