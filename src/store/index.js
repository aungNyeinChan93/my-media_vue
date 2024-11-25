import { createStore } from "vuex";

const store = createStore({
  state: {
    test: "testing",
    token: "",
    userData: "",
  },
  getters: {
    testgetter(state) {
      return state.test;
    },
    getToken: (state) => {
      return state.token;
    },
    getUserData: (state) => state.userData,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setUserData(state, value) {
      state.userData = value;
    },
  },
  actions: {
    async actionToken({ commit }, data) {
      commit("setToken", data);
    },
    async actionUserData(state, payload) {
      state.commit("setUserData", payload);
    },
  },
});

export default store;
