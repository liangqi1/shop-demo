// 地址
import router from "../../router"

const state = {
  adressList: [
    { areaCode: "440305", 
    province: '广东省', 
    city: '深圳市', 
    county: "南山区", 
    addressDetail: "高新园地铁站C出口",
    name: "我是谁",
    tel: "13612345678"
  }
  ],
}

const getters = {
    adressList: (state) => state.adressList,
}

const actions = {
    addAdress(state, data) {
        state.commit('setAdressList', data)
        router.back(-1)
    }
}

const mutations = {
  setAdressList: (state, data) => {
    state.adressList = [ ...state.adressList, data]
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}