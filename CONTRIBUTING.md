# Contributing to Rust Toolchain GitHub Actions

Thank you for considering contributing to the Rust Toolchain project! We welcome
contributions from everyone. By participating in this project, you agree to
abide by our code of conduct.

This GitHub Action heavily relise on
[rustup installer](https://www.rust-lang.org/tools/install) any major changes in
this tool can break this action and introduction to new feautres might create
room for more features for this Action.

## Getting Started

1. Fork the repository and clone your fork locally.
2. Create a new branch for your contribution:
   ```sh
   git checkout -b my-feature-branch
   ```
3. Make you changes in the new branch.

## Development Setup

1. Install the necessary dependencies:

   ```sh
   npm install
   ```

2. Build the project:

   ```sh
   npm run bundle
   ```

3. Run the tests:
   ```sh
   npm run test
   ```

## Submitting Changes

1. Run `npm run all` before pushing changes and opening PR, this will ensure
   every thing is up-to date so that GitHub Actions don't fail.

2. Commit your changes with a clear and descriptive commit message.

3. Push your changes to your fork:

   ```sh
   git push origin my-feature-branch
   ```

4. Open a
   [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
   again the `main` branch of the
   [original repository](https://github.com/rs-workspace/rust-toolchain)

## Additional Resources

- [README.md](./README.md)
