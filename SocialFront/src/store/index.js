import { createStore } from 'vuex'
import setting from './setting/index'

const debug = process.env.NODE_ENV !== 'production'
const store = createStore({
  modules: {
    setting
  },
  state: {
    isLoggedIn: false,
    userInfo: null,
    posts: []
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    login(state, user) {
      state.isLoggedIn = true;
      state.userInfo = user;
    },
    setUserInfo(state, user) {
      if (state.userInfo.name !== user.name) state.userInfo.name = user.name;
      if (state.userInfo.sex !== user.sex) state.userInfo.sex = user.sex;
      if (state.userInfo.intro !== user.intro) state.userInfo.intro = user.intro;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo)); // 同步更新 localStorage
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userInfo = null;
    },
    setSearchData(state, data) {
      localStorage.setItem("searchData", JSON.stringify(data));
    },
    getSearchData(state) {
      state.posts = localStorage.getItem("searchData")
        ? JSON.parse(localStorage.getItem("searchData"))
        : [];  // 如果 localStorage 中沒有 searchData，默認為空陣列

    },
    // 新增 setAvatar mutation
    setAvatar(state, avatar) {
      if (state.userInfo) {
        state.userInfo.avatar = avatar;
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo)); // 同步更新 localStorage
      }
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment');
    },
    login({ commit }, user) {
      commit('login', user);
    },
    logout({ commit }) {
      commit('logout');
    },
    initializeStore({ commit }) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || null);
      const Verifiable = userInfo ? true : false;
      commit('setLoggedIn', Verifiable);
      if (userInfo) {
        commit('login', userInfo);
      }

      commit('getSearchData');
    },
    // 添加 action 來調用 setAvatar mutation
    updateAvatar({ commit }, avatar) {
      commit('setAvatar', avatar);
    },
    updateUserInfo({ commit }, user) {
      commit('setUserInfo', user);
    },
    setSearchData({ commit }, data) {
      commit('setSearchData', data);
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    }
  },
  strict: debug
})

export default store;
