import arithmosporaReducer from './slice'
import { configureStore } from '@reduxjs/toolkit'

/**
 * We keep a reference to the store here to allow us to access it
 * independently, i.e. in our socket event dispatcher.
 */
let store

/**
 * Wrapper for configureStore which adds in our reducer and allows us to keep
 * a reference to the created store object.
 * @param {Object} args - The data structure to pass to configureStore.
 * @returns {Object} - The newly created Redux store.
 */
const configureArithmosporaStore = (args) => {
  let { reducer = {}, middleware, devTools } = args
  reducer.stats = arithmosporaReducer
  if (!middleware) {
    middleware = (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  }
  if (!devTools) {
    // Devtools optimisation: don't include large time bucket objects in
    // devTools actions. See
    // https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/Troubleshooting.md#excessive-use-of-memory-and-cpu
    devTools = {
      actionSanitizer: (action) =>
        action.type === 'arithmospora/stats' &&
        action.payload.args[0] === 'timed'
          ? {
              ...action,
              payload: {
                ...action.payload,
                payload: {
                  ...action.payload.payload,
                  dataPoints: {
                    60: {
                      name: '60',
                      data: '<<TIME BUCKETS OBJECT>>',
                      dataPoints: {}
                    },
                    300: {
                      name: '60',
                      data: '<<TIME BUCKETS OBJECT>>',
                      dataPoints: {}
                    },
                    3600: {
                      name: '60',
                      data: '<<TIME BUCKETS OBJECT>>',
                      dataPoints: {}
                    }
                  }
                }
              }
            }
          : action
    }
  }
  store = configureStore({ ...args, reducer, middleware, devTools })
  return store
}

export { store }
export default configureArithmosporaStore
