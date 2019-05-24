import invoiceApi from '../services/api'

export default {
  namespaced: true,

  state: {
    // This state contains all the clients after fetching them from API
    invoices: []
  },

  getters: {
    invoices: ({ invoices }) => invoices,
    getInvoice: ({ invoices }) => id =>
      invoices.find(invoice => invoice.id === id)
  },

  actions: {
    getInvoicesFromApi({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        invoiceApi
          .get('/invoices/', {
            headers: {
              Authorization: `Token ${rootState.authToken}`
            }
          })
          .then(({ data }) => {
            commit('setInvoicesList', data)
            resolve('success')
          })
          .catch(error => reject(error))
      })
    },

    createInvoice({ commit, rootState }, formData) {
      return new Promise((resolve, reject) => {
        const postData = { ...formData }
        invoiceApi
          .post('/invoices/', postData, {
            headers: {
              Authorization: `Token ${rootState.authToken}`
            }
          })
          .then(response => {
            if (response.status === 201) {
              commit('addInvoice', { ...response.data })
              rootState.invoicesCount++
              resolve('created')
            }
          })
          .catch(e => reject(e))
      })
    },

    updateInvoice({ commit, rootState }, { formData, id }) {
      return new Promise((resolve, reject) => {
        const data = { ...formData }
        let invoice_items = []
        for (let item of formData.invoice_items)
          invoice_items.push({ item: item.item, quantity: item.quantity })
        data.invoice_items = invoice_items
        invoiceApi
          .put(`/invoices/${id}/`, data, {
            headers: {
              Authorization: `Token ${rootState.authToken}`
            }
          })
          .then(response => {
            if (response.status === 200) {
              commit('updateInvoice', { data: response.data, id })
              resolve('updated')
            }
          })
          .catch(e => reject(e))
      })
    },

    removeInvoice({ commit, rootState }, id) {
      new Promise((resolve, reject) => {
        invoiceApi
          .delete(`/invoices/${id}`, {
            headers: {
              Authorization: `Token ${rootState.authToken}`
            }
          })
          .then(response => {
            if (response.status >= 200 && response.status <= 204) {
              commit('removeInvoice', id)
              rootState.invoicesCount--
              resolve('removed')
            } else reject('error')
          })
          .catch(e => reject(e))
      })
    }
  },

  mutations: {
    setInvoicesList: (state, invoicesList) => (state.invoices = invoicesList),
    addInvoice: (state, invoiceData) => state.invoices.push(invoiceData),
    updateInvoice: (state, { data, id }) => {
      const index = state.invoices.indexOf(i => i.id === id)
      state.invoices[index] = { ...data }
    },
    removeInvoice: (state, id) =>
      (state.invoices = state.invoices.filter(invoice => invoice.id !== id))
  }
}
