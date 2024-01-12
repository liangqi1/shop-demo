// 用户信息
import router from "../../router"
import { fetchLogin, fetchUsrInfo } from '@/http/http.js'
import { GetObjStorage } from '@/utils/utils.js'

const state = {
  isLogin: localStorage.getItem('usr-t') ? true : false, // 登陆状态
  userInfo: {}
}

const getters = {
  isLogin: (state) => state.isLogin,
  userInfo: (state) => state.userInfo,
}

const actions = {
  // 登录
  async login(state, data) {
    const loginRes = await fetchLogin(data) || {}
    state.commit('setIsLogin', true)
    localStorage.setItem(`usr-t`, loginRes.token)

    const userRes = await fetchUsrInfo()
    state.commit('setUser', userRes)

    // NOTE: storage 写入初始化数据（便于测试）
    const cartsTemp = GetObjStorage('carts')
    localStorage.setItem('carts', JSON.stringify([
      {id: '1', num: 1 },
      {id: '2', num: 1 },
      ...cartsTemp,
    ]))
    router.replace('/index')
  },

  // 登出
  loginOut(state) {
    localStorage.removeItem('usr-t');
    state.commit('setIsLogin', false)
    router.push('/login')
  }
}
const mutations = {
  setIsLogin: (state, data) => {
    state.isLogin = data
  },
  setUser: (state, data) => {
    state.userInfo = data
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}