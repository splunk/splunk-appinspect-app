# Contributing to AppInspect

## Overview

The project contains a variety of packages that are published and versioned collectively. Each package lives in its own
directory in the `/packages` directory. Each package is self contained, and defines its dependencies in a package.json file.

We use [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) and [Lerna](https://github.com/lerna/lerna) for
managing and publishing multiple packages in the same repository.


## Getting Started

1. Clone the repo.
2. Install yarn (>= 1.2) if you haven't already: `npm install --global yarn`.
3. Run the setup task: `yarn run setup`.

After this step, the following tasks will be available:

* `start` – Run the `start` task for each project
* `build` – Create a production bundle for all projects
* `test` – Run unit tests for each project
* `lint` – Run JS and CSS linters for each project
* `format` – Run prettier to auto-format `*.js`, `*.jsx` and `*.css` files. This command will overwrite files without
asking, `format:verify` won't.

Running `yarn run setup` once is required to enable all other tasks. The command might take a few minutes to finish.

## Other Commands

- Splunk React UI Components Library: `npm i @splunk/create`

- Update node version:

* `brew update`
* `npm install -g n`
* `sudo n latest`

- Link App to Splunk Home: `yarn run link:app`

## Recurring Builds

- install and build: `yarn install && yarn run build`
- start: `yarn start`


## Developer Scripts

Commands run from the root directory will be applied to all packages. This is handy when working on multiple packages
simultaneously. Commands can also be run from individual packages. This may be better for performance and reporting when
 only working on a single package. All of the packages have similar developer scripts, but not all scripts are implemented
 for every package. See the `package.json` of the package in question to see which scripts are available there.

For more granular control of development scripts, consider using [Lerna](https://github.com/lerna/lerna) directly.

## Community

Stay connected with other developers building on the Splunk platform.

* [Issues and pull requests](https://github.com/splunk/splunk-appinspect-app/issues/)
* [Community Slack](https://splunk-usergroups.slack.com/app_redirect?channel=fdse)
* [Splunk Blogs](https://www.splunk.com/blog)
* [Twitter](https://twitter.com/splunkdev)

### Contributions

If you would like to contribute to the AppInspect App, see [Contributing to Splunk](https://www.splunk.com/en_us/form/contributions.html). For additional guidelines, see [CONTRIBUTING](CONTRIBUTING.md). 


## Code Formatting

AppInspect uses [prettier](https://github.com/prettier/prettier) to ensure consistent code formatting. It is recommended
 to [add a prettier plugin to your editor/ide](https://github.com/prettier/prettier#editor-integration).
