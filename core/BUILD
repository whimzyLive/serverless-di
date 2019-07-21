package(default_visibility = ["//visibility:public"])

load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")

ts_library(
    name = "library",
    srcs = glob(
        [
            "src/**/*.ts",
            "*.ts",
        ],
        exclude = [
            '*.spec.ts',
            '*.test.ts',
            '*.e2e.ts',
            "src/**/*.test.ts",
            "src/**/*.spec.ts",
            "src/**/*.e2e.ts",
        ],
    ),
    module_name = "@serverless-di/core",
    deps = [
        "@npm//@types/node",
        "@npm//inversify",
        "@npm//reflect-metadata",
        "@npm//base-64",
        "@npm//utf8"
    ],
)


ts_library(
    name = "e2e",
    testonly = True,
    srcs = glob([
        '*.spec.ts',
        '*.test.ts',
        '*.e2e.ts',
        "src/**/*.test.ts",
        "src/**/*.spec.ts",
        "src/**/*.e2e.ts",
    ]),
    deps = [
        ":library",
        "@npm//@types/jasmine",
    ],
)

jasmine_node_test(
    name = "test",
    size = "small",
    srcs = [":e2e"],
    deps = [
        "@npm//@types/jasmine",
        "@npm//jasmine",
    ],
)