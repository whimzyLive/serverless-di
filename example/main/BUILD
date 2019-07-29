package(default_visibility = ["//visibility:public"])

exports_files([
    "package.json",
    "package-lock.json",
])

load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@npm_bazel_jasmine//:index.bzl", "jasmine_node_test")
load("@build_bazel_rules_nodejs//:defs.bzl", "rollup_bundle")

ts_library(
    name = "src",
    srcs = glob(
        ["src/**/*.ts", "*.ts"],
        exclude = [
            "*.spec.ts",
            "src/**/*.spec.ts",
        ],
    ),
    tsconfig = "//:tsconfig.json",
    deps = [
        "//core:library",
        "@npm//@types/node",
        "@npm//inversify",
        "@npm//reflect-metadata",
    ],
)

ts_library(
    name = "e2e",
    testonly = True,
    srcs = glob([
        "*.spec.ts",
        "src/**/*.spec.ts",
    ]),
    tsconfig = "//:tsconfig.json",
    deps = [
        ":src",
        "//core:library",
        "//testing:library",
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

rollup_bundle(
    name = "bundle",
    srcs = glob(
        ["**/*.js"],
        exclude = [
            "*.spec.js",
        ],
    ),
    entry_point = "example/main/src/index.js",
    global_name = "exports",
    globals = {
        "inversify": "require(\"inversify\")",
        "reflect-metadata": "require(\"reflect-metadata\")",
    },
    deps = [":src"],
)
