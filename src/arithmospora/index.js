import { arithmosporaActions } from './slice'
import { store } from './store'
import config from '../config'

/**
 * Object to hold our stats source WebSocket instances.
 * @type {Object.<string, {socket: WebSocket, interval: interval}>}
 */
let sockets = {}

/**
 * Connect a set of stats sources, ensuring the state object is prepared for
 * each source. We only connect a source if it doesn't already exist in state,
 * which allows us to call this from our components every time they render
 * and ensure we only actually connect the sockets once for each source.
 * An options object can be passed to enable or disable specific named stats.
 * If no options object is passed, all stats will be enabled by default.
 * Note that enable/disable mechanism steers towards enabling: explicit
 * disabling is only ever done on the first call, and later calls will only
 * ever enable some or all stats.
 * @param {string[]} statsSources - Array of stats source names corresponding
 *     to sources defined in config.
 * @param {Object} [options={}] - Options object.
 * @param {Object.<string, *>} options.only - Only enable stats specified by
 *     provided keys. e.g. {only: { 'other:totalvotes': true}}.
 * @param {Object.<string, *>} options.exclude - Disable stats specified by
 *     provided keys.
 * @see ../config
 */
const connectSources = (statsSources = [], options = {}) => {
  const state = store.getState()

  for (const statsSource of statsSources) {
    if (!(statsSource in config.sources)) {
      console.log('Source not found in configuration', { statsSource })
      continue
    }
    if (!(statsSource in state.stats.sources)) {
      store.dispatch(arithmosporaActions.addSource({ statsSource, options }))
      connectSource(statsSource)
    } else {
      store.dispatch(
        arithmosporaActions.updateEnabled({ statsSource, options })
      )
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

  if (!(statsSource in sockets)) {
    sockets[statsSource] = { socket: null, interval: null }
  }
  sockets[statsSource].socket = new WebSocket(
    `${config.arithmosporaUrl}/${sourceConf.path}`
  )

  // Attempt to reconnect on disconnect after a short delay
  sockets[statsSource].socket.onopen = (event) => {
    if (sockets[statsSource].interval) {
      clearInterval(sockets[statsSource].interval)
      sockets[statsSource].interval = null
    }
  }
  sockets[statsSource].socket.onclose = (event) => {
    if (!sockets[statsSource].interval) {
      sockets[statsSource].interval = setInterval(
        () => connectSource(statsSource),
        5000
      )
    }
  }

  // Handle messages for this source
  sockets[statsSource].socket.onmessage = (event) => {
    const message = JSON.parse(event.data)
    if (window && window.electionStatsICU && window.electionStatsICU.debug) {
      console.log({ debug: 'Stats message received', statsSource, ...message })
    }
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
