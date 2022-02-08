import { arithmosporaActions } from './slice'
import { store } from './store'
import config from '../config'

let connected = false
let sockets = []

const connectSources = (statsSources = [], dispatch = () => {}) => {
  // Don't reconnect if already connected
  if (connected) {
    return
  }
  connected = true

  for (const statsSource of statsSources) {
    if (!(statsSource in config.sources)) {
      console.log('Source not found in configuration', { statsSource })
      continue
    }
    store.dispatch(arithmosporaActions.addSource(statsSource))
    connectSource(statsSource)
  }
}

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
