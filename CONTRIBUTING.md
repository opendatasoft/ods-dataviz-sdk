# Contributing Guide

> Please note we have a [Code of Conduct](../../CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

Contributions are welcome and are greatly appreciated! Every little bit helps, and credit will always be given.

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

- [Get started](#get-started)
- [Reporting a bug](#reporting-a-bug)
- [Commit messages](#commit-messages)
- [Versioning](#versioning)
- [Pull Requests](#pull-requests)

## Get started

This is a monorepo managed with npm and [lerna](https://github.com/lerna/lerna). After forking `ods-dataviz-sdk` to your own Github, install the necessary tools for this monorepo:

```shell
npm install
```

If you want to watch and rebuild all packages:

```shell
npm run watch
```

**Contributing Guides specific to each package:**

- [:package: @opendatasoft/api-client](packages/api-client/CONTRIBUTING.md)
- [:package: @opendatasoft/visualizations](packages/visualizations/CONTRIBUTING.md)
- [:package: @opendatasoft/visualizations-react](packages/visualizations-react/CONTRIBUTING.md)

## Reporting a bug

We welcome clear bug reports. If you've found a bug in our packages that isn't a security risk, please file a report in [our issue tracker](https://github.com/opendatasoft/ods-dataviz-sdk/issues). Before you file your issue, search to see if it has already been reported. If so, up-vote (using GitHub reactions) or add additional helpful details to the existing issue to show that it's affecting multiple people.

We prefer that you provide a reproduction, in the form of a step-by-step description or snipped code. But if you can't provide a reproduction make this very clear in the issue and explain why that is the case.

If you want to [submit a pull request](#pull-requests) that fixes your bug, that's even better. We love getting bugfix pull requests. Just make sure they're written with the correct style and come with tests. Read further down for more details on proposing changes to core code.

## Commit messages

Good commit messages are important, that's why we're using [Conventional Commits Specification](https://www.conventionalcommits.org/). Which is a lightweight convention on top of commit messages. Apart from the gain in readability, the nice thing about using this specification studiously is that when you want to publish a new version of a package (see details [below](#versioning)), your changes will be listed automatically in the `CHANGELOG` file.

### Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special format that includes a **type**, a **scope** and a **subject**:

```text
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

The **type** must be one of the following:

- `feat`: A new feature
- `fix`: A bug fix
- `build`: Changes that affect the build system or external dependencies (example `scopes: rollup, lerna, npm`)
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `test`: Adding missing tests or correcting existing tests
- `doc`: Changes made to the documentation

## Pull Requests

Before you submit a pull request from your forked repo, check that it meets these guidelines:

- Name your branch to match the feature/bug fix that you are submitting.
- Limit yourself to one feature or bug fix per pull request.
- Include tests that prove your code works.
- If the pull request adds functionality, the docs should be updated as part of the same PR.
- Please rebase and resolve all conflicts before submitting.
- If the pull request fixes a bug, it should include tests that fail without the changes, and pass
with them.
- Be sure your author field in git is properly filled out with your full name and email address so we can credit you.
