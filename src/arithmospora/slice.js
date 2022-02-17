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
      const [group, ...statFragments] = action.payload.args
      state.sources[action.payload.source][group][statFragments.join(':')] = action.payload.payload
    },
    default: (state) => {
      state
    }
  }
})

export const arithmosporaActions = arithmosporaSlice.actions
export default arithmosporaSlice.reducer
