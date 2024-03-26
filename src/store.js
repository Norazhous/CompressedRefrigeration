import { createStore } from 'vuex'
import streamStore from './modules/streamStore.js'
import uiStore from './modules/uiStore.js'
import commandStore from './modules/commandStore.js'
import loggingStore from './modules/logging.js'
import rawDataStore from './modules/rawDataStore.js'

const store = createStore({
    modules:{
      rawData: rawDataStore,
      stream: streamStore,
      ui: uiStore,
      command: commandStore,
      logging: loggingStore,
    }
})

export default store