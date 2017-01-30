# angular1.6-weather-forecast

Simple single page application with Angular 1.6.x and ES6 that shows a 7-day forecast for a city by name.

REST API: http://openweathermap.org/api.

User is able to query by city name.

DEMO: http://weather-forecast-7days.bitballoon.com

Features:

- Es6 transpiling with babel
- Displays the forecast in a chart
- Uses LocalStorage because the API will give an HTTP Error if user makes too many requests in a short period of time.

## Css preprocessor: Sass (scss prefix)

## Build System
NG6 uses NPM scripts, Gulp, and Webpack together for its build system

`Webpack` handles all file-related concerns:
* Transpiling from ES6 to ES5 with `Babel`
* Loading HTML files as modules
* Transpiling stylesheets and appending them to the DOM
* Refreshing the browser and rebuilding on file changes
* Hot module replacement for transpiled stylesheets
* Bundling the app
* Loading all modules
* Doing all of the above for `*.spec.js` files as well

`Gulp` is the orchestrator:
* Starting and calling Webpack
* Starting a development server (yes, Webpack can do this too)

### Tasks
Here's a list of available tasks:
* `npm run build`
  * runs Webpack, which will transpile, concatenate, and compress (collectively, "bundle") all assets and modules into `dist/bundle.js`. It also prepares `index.html` to be used as application entry point, links assets and created dist version of our application.
* `npm run serve`
  * starts a dev server via `webpack-dev-server`, serving the client folder.
* `npm run watch`
  * alias of `serve`
* `npm start` (which is the default task that runs when typing `gulp` without providing an argument)
  * runs `serve`.




