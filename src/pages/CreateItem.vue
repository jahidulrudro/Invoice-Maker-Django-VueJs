<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="8" offset-md="2">
        <b-card>
          <h1>Create Item</h1>
          <p class="text-muted">Create a Item</p>
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
            <b-button type="submit" variant="success" block>Create Item</b-button>
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
      name: "",
      model: "",
      serial_number: "",
      stock: null,
      price: null,
      description: ""
    }
  }),

  methods: {
    onSubmit() {
      const { name, model, serial_number, price, description } = this.form;
      if (name && model && serial_number && price && description) {
        this.$store
          .dispatch("itemStore/createItem", { ...this.form })
          .then(() => this.$router.push({ name: "Items" }))
          .catch(e => console.error(e));
      }
    }
  }
};
</script>
