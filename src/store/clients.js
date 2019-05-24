import invoiceApi from '../services/api'

export default {
  namespaced: true,

  state: {
    // This state contains all the clients after fetching them from API
    clients: []
  },

  getters: {
    clients: ({ clients }) => clients,
    getClient: ({ clients }) => id => clients.find(client => client.id === id)
  },

  actions: {
    getClientsFromApi({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        invoiceApi
          .get('/clients/', {
            headers: {
              Authorization: `Token ${rootState.authToken}`
            }
          })
          .then(({ data }) => {
            commit('setClientsList', data)
            resolve('success')
          })
          .catch(error => reject(error))
      })
    },

    createClient({ commit, rootState }, formData) {
      return new Promise((resolve, reject) => {
        const postData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          business: formData.business,
          zip_code: formData.zipCode
        }
        invoiceApi
          .post('/clients/', postData, {
            headers: {
              Authorization: `Token ${rootState.authToken}`
            }
          })
          .then(response => {
            if (response.status === 201) {
              commit('addClient', { ...response.data })
              rootState.clientsCount++
              resolve('created')
            }
          })
          .catch(e => reject(e))
      })
    },

    updateClient({ commit, rootState }, { formData, id }) {
      return new Promise((resolve, reject) => {
        const data = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          business: formData.business,
          zip_code: formData.zipCode
        }
        invoiceApi
          .put(`/clients/${id}/`, data, {
            headers: {
              Authorization: `Token ${rootState.authToken}`
            }
          })
          .then(response => {
            if (response.status === 200) {
              commit('updateClient', { data, id })
              resolve('updated')
            }
          })
          .catch(e => reject(e))
      })
    },

    removeClient({ commit, rootState }, id) {
      new Promise((resolve, reject) => {
        invoiceApi
          .delete(`/clients/${id}`, {
            headers: {
              Authorization: `Token ${rootState.authToken}`
            }
          })
          .then(response => {
            if (response.status >= 200 && response.status <= 204) {
              commit('removeClient', id)
              rootState.clientsCount--
              resolve('removed')
            } else reject('error')
          })
          .catch(e => reject(e))
      })
    }
  },

  mutations: {
    setClientsList: (state, clientsList) => (state.clients = clientsList),
    addClient: (state, clientData) => state.clients.push(clientData),
    updateClient: (state, { data, id }) => {
      const index = state.clients.indexOf(c => c.id === id)
      state.clients[index] = { ...data }
    },
    removeClient: (state, id) =>
      (state.clients = state.clients.filter(client => client.id !== id))
  }
}
