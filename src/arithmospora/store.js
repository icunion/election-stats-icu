import arithmosporaReducer from './slice'
import { configureStore } from '@reduxjs/toolkit'

let store

const configureArithmosporaStore = (config) => {
  let { reducer = {} } = config
  reducer.stats = arithmosporaReducer
  store = configureStore({ ...config, reducer })
  return store
}

export { store }
export default configureArithmosporaStore
