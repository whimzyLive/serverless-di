package(default_visibility = ["//visibility:public"])

load("@bazel_tools//tools/build_defs/pkg:pkg.bzl", "pkg_tar")

genrule(
    name = "bundle",
    srcs = [
        "//example/main:bundle.es2015.js",
    ],
    outs = ["bundle.js"],
    cmd = "cp $< $@",
)

pkg_tar(
    name = "main",
    srcs = [
        ":bundle",
        "//example/main:package.json",
        "//example/main:package-lock.json",
    ],
    extension = "tar.gz",
    package_dir = "main",
)

pkg_tar(
    name = "s3_pack",
    srcs = [
        "template.yml",
    ],
    extension = "tar.gz",
    deps = [
        ":main",
    ],
)

genrule(
    name = "zip",
    srcs = [
        ":s3_pack",
    ],
    outs = ["latest.zip"],
    cmd = "tar -xzf $(location :s3_pack) && zip -r $@ * -x \"*bazel-out*\" -x \"*external*\"",
    output_to_bindir = True,
)
