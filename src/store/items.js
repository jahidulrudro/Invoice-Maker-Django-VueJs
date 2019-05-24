import invoiceApi from "../services/api";

export default {
  namespaced: true,

  state: {
    // This state contains all the items after fetching them from API
    items: []
  },

  getters: {
    items: ({ items }) => items,
    getItem: ({ items }) => id => items.find(item => item.id === id)
  },

  actions: {
    getItemsFromApi({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        invoiceApi
          .get("/items/", {
            headers: {
              Authorization: `Token ${rootState.authToken}`
            }
          })
          .then(({ data }) => {
            commit("setItemsList", data);
            resolve("success");
          })
          .catch(error => reject(error));
      });
    },

    createItem({ commit, rootState }, formData) {
      return new Promise((resolve, reject) => {
        const postData = {
          serial_number: formData.serial_number,
          name: formData.name,
          model: formData.model,
          stock: formData.stock ? formData.stock : null,
          price: formData.price,
          description: formData.description
        };
        invoiceApi
          .post("/items/", postData, {
            headers: {
              Authorization: `Token ${rootState.authToken}`
            }
          })
          .then(response => {
            if (response.status === 201) {
              commit("addItem", { ...response.data });
              rootState.itemsCount++;
              resolve("created");
            }
          })
          .catch(e => reject(e));
      });
    },

    updateItem({ commit, rootState }, { formData, id }) {
      return new Promise((resolve, reject) => {
        const data = {
          ...formData,
          stock: formData.stock ? formData.stock : null
        };
        invoiceApi
          .put(`/items/${id}/`, data, {
            headers: {
              Authorization: `Token ${rootState.authToken}`
            }
          })
          .then(response => {
            if (response.status === 200) {
              commit("updateItem", { data, id });
              resolve("updated");
            }
          })
          .catch(e => reject(e));
      });
    },

    removeItem({ commit, rootState }, id) {
      new Promise((resolve, reject) => {
        invoiceApi
          .delete(`/items/${id}`, {
            headers: {
              Authorization: `Token ${rootState.authToken}`
            }
          })
          .then(response => {
            if (response.status >= 200 && response.status <= 204) {
              commit("removeItem", id);
              rootState.itemsCount--;
              resolve("removed");
            } else reject("error");
          })
          .catch(e => reject(e));
      });
    }
  },

  mutations: {
    setItemsList: (state, itemsList) => (state.items = itemsList),
    addItem: (state, itemData) => state.items.push(itemData),
    updateItem: (state, { data, id }) => {
      const index = state.items.indexOf(i => i.id === id);
      state.items[index] = { ...data };
    },
    removeItem: (state, id) =>
      (state.items = state.items.filter(item => item.id !== id))
  }
};
