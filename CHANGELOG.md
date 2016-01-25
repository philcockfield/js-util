# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).


## [Unreleased] - YYYY-MM-DD
#### Added
#### Changed
#### Deprecated
#### Removed
#### Fixed
#### Security



## [2.0.7] - 2016-01-25
#### Changed
- Referencing [Babel](https://babeljs.io/) dependencies via `js-babel` and `js-babel-dev` modules.
- Linting updated to use [AirBnB style guide](https://github.com/airbnb/javascript).



## [2.0.0] - 2016-01-19
#### Changed
- Updated to Babel-6.
- Moved `lorem` into the root `/src` folder.
- Moved React CSS helpers into root `/src` folder as `react-css`.
- Removed aggregate API index, each module must be specifically references with an `import/require`.
  This is so facilitate not pulling in unnecessary code with Webpack.



#### Removed
- Removed color utilities that leaned on (bloat): https://www.npmjs.com/package/color
- Removed React validator helpers.  Now in https://github.com/philcockfield/react-schema
- Removed `lodash` (replaced with `ramda`).



## [1.0.11] - 2015-12-4
#### Fixed
- Exporting `{ PropTypes }` after changes to the `react-schema` library.
