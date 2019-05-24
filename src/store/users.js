import invoiceApi from '../services/api'

export default {
  namespaced: true,

  state: {
    // This state contains all the users after fetching them from API
    users: []
  },

  getters: {
    users: ({ users }) => users,
    getUser: ({ users }) => username =>
      users.find(user => user.username === username)
  },

  actions: {
    getUsersFromApi({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        invoiceApi
          .get('/users/', {
            headers: {
              Authorization: `Token ${rootState.authToken}`
            }
          })
          .then(({ data }) => {
            commit('setUsersList', data)
            resolve('success')
          })
          .catch(error => reject(error))
      })
    },

    createUser({ commit, rootState }, formData) {
      return new Promise((resolve, reject) => {
        const postData = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          is_superuser: formData.is_superuser,
          is_active: formData.is_active
        }
        invoiceApi
          .post('/users/', postData, {
            headers: {
              Authorization: `Token ${rootState.authToken}`
            }
          })
          .then(response => {
            if (response.status === 201) {
              commit('addUser', { ...response.data })
              rootState.usersCount++
              resolve('created')
            }
          })
          .catch(e => reject(e))
      })
    },

    updateUser({ commit, rootState }, { formData, username }) {
      return new Promise((resolve, reject) => {
        const data = { ...formData }
        invoiceApi
          .put(`/users/${username}/`, data, {
            headers: {
              Authorization: `Token ${rootState.authToken}`
            }
          })
          .then(response => {
            if (response.status === 200) {
              commit('updateUser', { data, username })
              resolve('updated')
            }
          })
          .catch(e => reject(e))
      })
    },

    removeUser({ commit, rootState }, username) {
      new Promise((resolve, reject) => {
        invoiceApi
          .delete(`/users/${username}`, {
            headers: {
              Authorization: `Token ${rootState.authToken}`
            }
          })
          .then(response => {
            if (response.status >= 200 && response.status <= 204) {
              commit('removeUser', username)
              rootState.usersCount--
              resolve('removed')
            } else reject('error')
          })
          .catch(e => reject(e))
      })
    }
  },

  mutations: {
    setUsersList: (state, usersList) => (state.users = usersList),
    addUser: (state, userData) => state.users.push(userData),
    updateUser: (state, { data, username }) => {
      const index = state.users.indexOf(u => u.username === username)
      state.users[index] = { ...data }
    },
    removeUser: (state, username) =>
      (state.users = state.users.filter(user => user.username !== username))
  }
}
