
import Vant from 'vant'
import 'amfe-flexible';
import { createApp } from 'vue'

import './style.css'
import 'vant/lib/index.css'
import './mock/index.js'

import store from './store/index.js'
import router from './router'

import App from './App.vue'

const plugins = [ Vant, router, store ]
const app = createApp(App);

// 注册插件
const registerPlugins = (plugins) => {
    return {
      install(app) {
        plugins.forEach(plugin => {
          app.use(plugin)
        })
      }
    }
  }

  
app.use(registerPlugins(plugins))
app.mount('#app')
