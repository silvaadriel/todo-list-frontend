import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import HTTP from './http';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: 'http://127.0.0.1:3333/api',
    registerUserName: '',
    registerEmail: '',
    registerPassword: '',
    registerError: null,
    loginEmail: '',
    loginPassword: '',
    loginError: null,
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setRegisterError(state, error) {
      state.registerError = error;
    },
    setRegisterUserName(state, name) {
      state.registerUserName = name;
    },
    setRegisterEmail(state, email) {
      state.registerEmail = email;
    },
    setRegisterPassword(state, password) {
      state.registerPassword = password;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    setLoginEmail(state, email) {
      state.loginEmail = email;
    },
    setLoginPassword(state, password) {
      state.loginPassword = password;
    },
  },
  actions: {
    logout({ commit }) {
      commit('setToken', null);
      router.push('/login');
    },
    register({ commit, state }) {
      commit('setRegisterError', null);
      return HTTP().post('/register', {
        username: state.registerUserName,
        email: state.registerEmail,
        password: state.registerPassword,
      })
        .then(({ data }) => {
          commit('setToken', data.token);
          router.push('/dashboard');
        })
        .catch(() => {
          commit('setRegisterError', 'An error has occured trying to create your account.');
        });
    },
    login({ commit, state }) {
      commit('setLoginError', null);
      return HTTP().post('/login', {
        email: state.loginEmail,
        password: state.loginPassword,
      })
        .then(({ data }) => {
          commit('setToken', data.token);
          router.push('/dashboard');
        })
        .catch(() => {
          commit('setLoginError', 'An error has occured trying to login.');
        });
    },
  },
});
