import { createStore } from 'vuex';
import user from './modules/user.js'
import adress from './modules/adress.js'
export default createStore({
    modules: {
        user,
        adress,
      },
})