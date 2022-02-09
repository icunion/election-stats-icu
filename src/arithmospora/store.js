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
  let { reducer = {} } = args
  reducer.stats = arithmosporaReducer
  store = configureStore({ ...args, reducer })
  return store
}

export { store }
export default configureArithmosporaStore
