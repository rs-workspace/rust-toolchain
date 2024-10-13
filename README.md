[![GitHub Super-Linter](https://github.com/rs-workspace/rust-toolchain/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/rs-workspace/rust-toolchain/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/rs-workspace/rust-toolchain/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/rs-workspace/rust-toolchain/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

# Rust Toolchain (GitHub Action)

GitHub actions for installing rust toolchain

## Example Workflow

```yml
name: test suite
on: [push, pull_request]

jobs:
  test:
    name: cargo test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: rs-workflow/rust-toolchain@main
      - run: cargo test --all-features
```

This installs the `stable` version of rust with `default` profile. To customize
this you need to pass the inputs:

## Inputs

All inputs are optional

| Name        | Description                                                                                                                                                    |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `toolchain` | Rust toolchain specifier e.g. `stable`, `nightly`, `beta`, `nightly-2024-10-12`, etc. [Read More](https://rust-lang.github.io/rustup/concepts/toolchains.html) |
| `profile`   | The group of components to be installed. [Read More](https://rust-lang.github.io/rustup/concepts/profiles.html)                                                |

<details>
<summary>Example</summary>

```yaml
name: test suite
on: [push, pull_request]

jobs:
  test:
    name: cargo test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: rs-workflow/rust-toolchain@main
        with:
          toolchain: nightly-2024-10-12
          profile: minimal
      - run: cargo test --all-features
```

For another example see [ci.yml](./.github/workflows/ci.yml)

</details>

## Outputs

No outputs are given when running this action

## Summary

A Summary table is created with the version of `rustc` and `rustup`

## License

The scripts and documentation in this project are released under the
[MIT License](./LICENSE).
