import * as types from './mutation_types'

const mutations = {
  // [方法名](参数1,参数2...){方法}
  [types.SET_OPEN_ID] (state, v) {
    state.openId = v
  },
  [types.SET_UNION_ID] (state, v) {
    state.unionId = v
  },
  [types.SET_USER_INFO] (state, v) {
    state.userInfo = v
  },
  [types.SET_CITY] (state, v) {
    state.city = v
  },
  [types.SET_PROVINCE] (state, v) {
    state.province = v
  },
  [types.SET_WEB_VIEW_URL] (state, v) {
    state.webViewUrl = v
  },
  [types.SET_PROVLIST] (state, v) {
    state.provList = v
  },
  [types.SET_PROVLISTALL] (state, v) {
    state.provListAll = v
  }
}

export default mutations
