import { createSlice } from '@reduxjs/toolkit'
import config from '../config'

const initialArithmosporaState = {
  sources: {}
}

const arithmosporaSlice = createSlice({
  name: 'arithmospora',
  initialState: initialArithmosporaState,
  reducers: {
    addSource: (state, action) => {
      state.sources[action.payload] = {}
    },
    available: (state, action) => {
      for (const group in action.payload.payload) {
        state.sources[action.payload.source][group] = Object.assign(
          {},
          ...action.payload.payload[group].map((key) => ({ [key]: {} }))
        )
      }
    },
    stats: (state, action) => {
      const [group, stat] = action.payload.args
      state.sources[action.payload.source][group][stat] = action.payload.payload
    },
    default: (state) => {
      state
    }
  }
})

export const arithmosporaSelector = (
  state,
  source,
  group,
  stat,
  statSelector = (stat) => stat
) => {
  if (
    source in state.stats.sources &&
    group in state.stats.sources[source] &&
    stat in state.stats.sources[source][group] &&
    Object.keys(state.stats.sources[source][group][stat]).length !== 0
  ) {
    return statSelector(state.stats.sources[source][group][stat])
  } else {
    return undefined
  }
}

export const arithmosporaActions = arithmosporaSlice.actions
export default arithmosporaSlice.reducer
