import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import HTTP from './http';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: 'https://todo-list-backend-api.herokuapp.com/api',
    user: {},
    registerUserName: '',
    registerEmail: '',
    registerPassword: '',
    registerError: null,
    loginEmail: '',
    loginPassword: '',
    loginError: null,
    token: null,
    tasks: [],
    newTaskName: null,
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
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
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setNewTaskName(state, name) {
      state.newTaskName = name;
    },
    appendTask(state, task) {
      state.tasks.push(task);
    },
    setTaskTitle(state, { task, title }) {
      task.title = title;
    },
    setEditMode(state, task) {
      Vue.set(task, 'isEditMode', true);
    },
    unsetEditMode(state, task) {
      Vue.set(task, 'isEditMode', false);
    },
    removeTask(state, task) {
      state.tasks.splice(state.tasks.indexOf(task), 1);
    },
  },
  actions: {
    logout({ commit }) {
      commit('setToken', null);
      router.push('/');
    },
    register({ commit, state }) {
      commit('setRegisterError', null);
      return HTTP().post('/register', {
        name: state.registerUserName,
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
    fetchUser({ commit }) {
      return HTTP().get('/user').then(({ data }) => {
        commit('setUser', data);
      });
    },
    fetchTasks({ commit }) {
      return HTTP().get('/todo').then(({ data }) => {
        commit('setTasks', data);
      });
    },
    createTask({ commit, state }) {
      return HTTP().post('/todo', {
        title: state.newTaskName,
        isDone: false,
      }).then(({ data }) => {
        commit('appendTask', data);
        commit('setNewTaskName', null);
      });
    },
    deleteTask({ commit }, task) {
      return HTTP().delete(`todo/${task.id}`)
        .then(() => {
          commit('removeTask', task);
        });
    },
    saveTask({ commit }, task) {
      return HTTP().put(`/todo/${task.id}`, task).then(() => {
        commit('unsetEditMode', task);
      });
    },
  },
});
