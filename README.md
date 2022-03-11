# election-stats-icu

> Imperial College Union election stats apps and components

[![NPM](https://img.shields.io/npm/v/election-stats-icu.svg)](https://www.npmjs.com/package/election-stats-icu) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Provides a library of [React](https://reactjs.org/) components for building live stats pages and blocks for [Imperial College Union](https://wwww.imperialcollegeunion.org)'s elections. [Take a look at the dashboard](https://www.imperialcollegeunion.org/your-union/leadership-elections-2022/stats)!

## Overview

The library is intended to be used as part of a minimal app whose job is to set up a Redux store, wrap one of the `block` or `pages` components, and render the app to the DOM. The reason for this is so we can build an app designed to be delivered to the browser from a [Drupal 9](https://www.drupal.org) module on imperialcollegeunion.org, and to separate that concern from the development of the live stats front-end, which can be done completely independently with just this library.

The library was created using [create-react-library](https://www.npmjs.com/package/create-react-library) and is organised into eight main folders:

* `arithmospora`: Code relating to connecting [Arithmospora](https://github.com/icunion/arithmospora) to a [Redux](https://redux.js.org/) state slice.
* `blocks`: Top-level components intended to be rendered to a Drupal block (e.g. live stats banners).
* `components`: The main component library used top level block and page components.
* `config`: Provides environment specific configuration for connecting to Arithmospora.
* `definitions`: Provides metadata relating to stats data, e.g. names of departments, progress markers, etc.
* `hooks`: Useful non-arithmospora hooks (Arithmospora hooks
can be found in `arithmospora/hooks`)
* `pages`: Top-level components intended to be rendered as a full page, either in the content region of a .org page (full width) or completely standalone.
* `styles`: Styles and sass variables common to all apps.

## Install

```bash
npm install --save election-stats-icu
```

## Usage

TODO: Plug the gaps in the below clues.

Apps using this library should set up a Redux store and wrap the App component in the store provider in the usual way:

`index.js`:
```js
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store/index'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

The store needs to be configured using the `configureStore` function exported by the library rather than the usual version provided by Redux Toolkit: this takes care of setting up the `stats` state slice which the library uses for all the stats data. Apps are free to set up their own state slices and pass their reducers so the store gets configured for all required state slices. In the below example we don't need any other slices so we don't have any extra reducers to pass:

`store/index.js`:

```js
import { configureStore } from 'election-stats-icu'

const store = configureStore({
  reducer: {}
})

export default store
```

Finally we build an app component by importing a block or page component from the library and returning it is our JSX to render:

`App.js`:
```jsx
import React from 'react'

import { Banner } from 'election-stats-icu'
import 'election-stats-icu/dist/index.css'

const App = () => {
  return <Banner votingCloseDate={Date.now() + 5000} mainSource="le2022"/>
}

export default App
```

## Development

See the [create-reacte-app Development section](https://www.npmjs.com/package/create-react-library#development). The general idea is to run `npm start` in the top level folder to build the library, and then run `npm start` in the example folder to build the development app.

When installing, the top level npm install should trigger an install in the example app,folder, but it may be necessary to perform this step explicitly in some circumstances. In the `example` folder
the shared dependencies (such as `react` and `redux` are sourced from the parent folder to ensure the example app uses the same React and Redux instances as the library itself.

The example app includes a simple toolbar to facilitate switching between the libraries block and page app components.

When developing, the sources and arithmospora instance defined in `config/config-dev.json` are used. You can connect to live sources by overriding these values with those found in `config/config-production.json`, which are the values used in production environments (i.e when `process.env.NODE_ENV === 'production'`)

## Contact

Email: ICU Systems Team [icu.systems@imperial.ac.uk](mailto:icu.systems@imperial.ac.uk)

## License

MIT © [Imperial College Union](https://www.imperialcollegeunion.org)
