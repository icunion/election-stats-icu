import { arithmosporaActions } from './slice'
import { store } from './store'
import config from '../config'

/**
 * Object to hold our stats source WebSocket instances.
 * @type {Object.<string, WebSocket>}
 */
let sockets = {}

/**
 * Connect a set of stats sources, ensuring the state object is prepared for
 * each source. We only connect a source if it doesn't already exist in state,
 * which allows us to call this from our components every time they render
 * and ensure we only actually connect the sockets once for each source.
 * @param {string[]} statsSources - Array of stats source names corresponding
 *     to sources defined in config.
 * @see ../config
 */
const connectSources = (statsSources = []) => {
  const state = store.getState()

  for (const statsSource of statsSources) {
    if (!(statsSource in config.sources)) {
      console.log('Source not found in configuration', { statsSource })
      continue
    }
    if (!(statsSource in state.stats.sources)) {
      store.dispatch(arithmosporaActions.addSource(statsSource))
      connectSource(statsSource)
    }
  }
}

/**
 * Connects a websocket for the named stats source, ensuring the socket gets
 * reconnected automatically if it becomes disconnected. Sets up an event
 * listener on the websocket to forward arithmospora events to the reducer.
 * @param {string} statsSource - The name of the stats source to connect.
 */
const connectSource = (statsSource) => {
  const sourceConf = config.sources[statsSource]
  let interval = null

  sockets[statsSource] = new WebSocket(
    `${config.arithmosporaUrl}/${sourceConf.path}`
  )

  // Attempt to reconnect on disconnect after a short delay
  sockets[statsSource].onopen = (event) => {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }
  sockets[statsSource].onclose = (event) => {
    if (!interval) {
      interval = setInterval(() => connectSource(statsSource), 5000)
    }
  }

  // Handle messages for this source
  sockets[statsSource].onmessage = (event) => {
    const message = JSON.parse(event.data)
    //console.log(message)
    const [messageEvent, ...messageArgs] = message.event.split(':')
    store.dispatch(
      arithmosporaActions[messageEvent]({
        source: statsSource,
        args: messageArgs,
        payload: message.payload
      })
    )
  }
}

export default connectSources
