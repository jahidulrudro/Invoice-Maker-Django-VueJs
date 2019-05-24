<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="8" offset-md="2">
        <b-card>
          <h1>Update Item</h1>
          <p class="text-muted">Update your Item</p>
          <b-form @submit.prevent="onSubmit">
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-input-group-text>
                  <i class="icon-menu"></i>
                </b-input-group-text>
              </b-input-group-prepend>
              <b-form-input
                type="text"
                :maxlength="256"
                required
                v-model="form.name"
                placeholder="Name"
              ></b-form-input>
            </b-input-group>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-input-group-text>
                  <i class="icons cui-tags"></i>
                </b-input-group-text>
              </b-input-group-prepend>
              <b-form-input
                type="text"
                :maxlength="256"
                required
                v-model="form.model"
                placeholder="Model"
              ></b-form-input>
            </b-input-group>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-input-group-text>
                  <i class="icon-puzzle"></i>
                </b-input-group-text>
              </b-input-group-prepend>
              <b-form-input
                type="text"
                required
                :maxlength="32"
                v-model="form.serial_number"
                placeholder="Serial Number"
              ></b-form-input>
            </b-input-group>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-input-group-text>
                  <i class="icons icon-plus"></i>
                </b-input-group-text>
              </b-input-group-prepend>
              <b-form-input type="number" v-model="form.stock" placeholder="Stock"></b-form-input>
            </b-input-group>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-input-group-text>
                  <i class="icons cui-dollar"></i>
                </b-input-group-text>
              </b-input-group-prepend>
              <b-form-input type="number" required v-model="form.price" placeholder="Price"></b-form-input>
            </b-input-group>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-input-group-text>
                  <i class="icon-menu"></i>
                </b-input-group-text>
              </b-input-group-prepend>
              <b-form-textarea
                required
                v-model="form.description"
                placeholder="Description of your Item"
              />
            </b-input-group>
            <b-button type="submit" variant="primary" block>Update Item</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    form: {
      name: null,
      model: null,
      serial_number: null,
      stock: null,
      price: null,
      description: null
    }
  }),

  created() {
    const id = this.$route.params.id;
    const item = this.$store.getters["itemStore/getItem"](id);
    this.form = {
      name: item.name,
      model: item.model,
      serial_number: item.serial_number,
      price: item.price,
      stock: item.stock,
      description: item.description
    };
  },

  methods: {
    onSubmit() {
      const { name, model, serial_number, price, description } = this.form;
      const id = this.$route.params.id;
      if (name && model && serial_number && price && description) {
        this.$store
          .dispatch("itemStore/updateItem", { formData: { ...this.form }, id })
          .then(() => this.$router.push({ name: "Items" }))
          .catch(e => console.error(e));
      }
    }
  }
};
</script>
