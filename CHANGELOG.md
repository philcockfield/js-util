# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).


## [Unreleased] - YYYY-MM-DD
#### Added

#### Changed
- Updated to Babel-6.
- Moved `lorem` into the root `/src` folder.
- Moved React CSS helpers into root `/src` folder as `react-css`.
- Removed aggregate API index, each module must be specifically references with an `import/require`.
  This is so facilitate not pulling in unnecessary code with Webpack.

#### Deprecated

#### Removed
- Removed color utilities that leaned on (bloat): https://www.npmjs.com/package/color
- Removed React validator helpers.  Now in https://github.com/philcockfield/react-schema
- Removed `lodash` (replaced with `ramda`).

#### Fixed
#### Security


## [1.0.11] - 2015-12-4
#### Fixed
- Exporting `{ PropTypes }` after changes to the `react-schema` library.



## [0.0.1] - YYYY-MM-DD
#### Added
Initial creation and publish.
