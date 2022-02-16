import { useState, useEffect } from 'react'
import ls from 'localstorage-slim'

function getStorageValue(key, defaultValue, config) {
  const value = ls.get(`ElectionStatsICU.${key}`, config)
  return value !== null ? value : defaultValue
}

const useLocalStorage = (key, defaultValue, setterConfig = {}, getterConfig = {}) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue, getterConfig)
  })

  useEffect(() => {
    ls.set(`ElectionStatsICU.${key}`, value, setterConfig)
  }, [key, value, setterConfig])

  return [value, setValue]
}

export default useLocalStorage
