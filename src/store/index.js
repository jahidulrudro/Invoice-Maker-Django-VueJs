import Vue from "vue";
import Vuex from "vuex";

import invoiceApi from "../services/api";
import clients from "./clients";
import items from "./items";
import invoices from "./invoices";
import users from "./users";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    clientStore: clients,
    itemStore: items,
    invoiceStore: invoices,
    userStore: users
  },
  state: {
    // Auth Token stores the token after user logs in
    authToken: null,
    // Number of Items in database
    itemsCount: 0,
    // Number of Invoices in database
    invoicesCount: 0,
    // Number of Clients in database
    clientsCount: 0,
    // Number of Users in database
    usersCount: 0,
    // This object contains the company details
    company: null,
    // Currency of the Invoice Prices
    currency: "$",
    // Data for the charts are stored here
    chartData: null
  },
  getters: {
    // Related Getters for the above states
    authToken: ({ authToken }) => authToken,
    isAuthenticated: ({ authToken }) => authToken !== null,
    itemsCount: ({ itemsCount }) => itemsCount,
    invoicesCount: ({ invoicesCount }) => invoicesCount,
    clientsCount: ({ clientsCount }) => clientsCount,
    usersCount: ({ usersCount }) => usersCount,
    company: ({ company }) => company,
    currency: ({ currency }) => currency,
    chartData: ({ chartData }) => chartData
  },
  actions: {
    // login action that stores the authToken to the store
    login: ({ commit }, { username, password }) =>
      new Promise((resolve, reject) => {
        invoiceApi
          .post("/auth/", {
            username,
            password
          })
          .then(response => {
            if (response.status === 200) {
              const { token } = response.data;
              commit("setAuthToken", token);
              resolve("success");
            }
          })
          .catch(error => reject(error));
      }),

    // logout action removes the authToken from localStorage and state
    logout: ({ commit }) =>
      new Promise(resolve => {
        commit("removeAuthToken");
        resolve("success");
      }),

    // Initialize HomePage Items
    initApp({ commit, state, dispatch }) {
      invoiceApi
        .get("/home/", {
          headers: {
            Authorization: `Token ${state.authToken}`
          }
        })
        .then(response => {
          const clientsCount = response.data.clients_count,
            itemsCount = response.data.items_count,
            invoicesCount = response.data.invoices_count,
            usersCount = response.data.users_count,
            chartData = response.data.item_sells,
            filteredChartData = [];
          for (let itemName in chartData) {
            filteredChartData.push({
              name: itemName,
              y: chartData[itemName]
            });
          }
          commit("setClientsCount", clientsCount);
          commit("setInvoicesCount", invoicesCount);
          commit("setItemsCount", itemsCount);
          commit("setUsersCount", usersCount);
          commit("setChartData", filteredChartData);

          dispatch("getCompanyFromApi")
            .then(() => {})
            .catch(e => {
              console.log("Error while Fetching Company", e.response);
              return e;
            });
        })
        .catch(e => console.log(e));
    },

    // GET Clients, Invoices and Items count from server
    getClientsInvoicesItems: ({ commit }, counts) => {
      commit("setItemsCount", counts.itemsCount || 0);
      commit("setInvoicesCount", counts.invoicesCount || 0);
      commit("setClientsCount", counts.clientsCount || 0);
    },

    // GET Company Details from server
    getCompanyFromApi({ commit, state }) {
      return new Promise((resolve, reject) => {
        invoiceApi
          .get("/company/", {
            headers: {
              Authorization: `Token ${state.authToken}`
            }
          })
          .then(response => {
            commit("setCompany", response.data);
            resolve(response.data);
          })
          .catch(e => reject(e));
      });
    },

    // Update Company Details
    updateCompany({ commit, state }, { formData }) {
      return new Promise((resolve, reject) => {
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("address", formData.address);
        data.append("currency", formData.currency);
        if (formData.logo) data.append("logo", formData.logo);
        if (formData.small_logo) data.append("small_logo", formData.small_logo);
        if (formData.clear_logo) data.append("clear_logo", formData.clear_logo);
        if (formData.clear_small_logo)
          data.append("clear_small_logo", formData.clear_small_logo);
        invoiceApi
          .put("/company/", data, {
            headers: {
              Authorization: `Token ${state.authToken}`
            }
          })
          .then(response => {
            commit("setCompany", response.data);
            resolve(response);
          })
          .catch(e => reject(e));
      });
    }
  },

  mutations: {
    setAuthToken: (state, token) => {
      localStorage.setItem("token", token);
      state.authToken = token;
    },
    removeAuthToken: state => {
      localStorage.removeItem("token");
      state.authToken = null;
    },

    setItemsCount: (state, count) => (state.itemsCount = count),
    setInvoicesCount: (state, count) => (state.invoicesCount = count),
    setClientsCount: (state, count) => (state.clientsCount = count),
    setUsersCount: (state, count) => (state.usersCount = count),
    setCompany: (state, data) => {
      state.company = data;
      state.currency = data.currency;
    },
    setChartData: (state, data) => (state.chartData = data)
  }
});
