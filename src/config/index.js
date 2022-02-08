import configDev from './config-dev.json'
import configProduction from './config-production.json'

const config =
  process.env.NODE_ENV === 'production' ? configProduction : configDev

export default config
