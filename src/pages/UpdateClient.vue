<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="8" offset-md="2">
        <b-card>
          <b-col>
            <h1>Update Client</h1>
            <p class="text-muted">Update your client</p>
            <b-form @submit.prevent="onSubmit">
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-menu"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input type="text" required placeholder="Client Name" v-model="form.name"/>
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>@</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  id="emailInput"
                  type="email"
                  required
                  placeholder="Email Address"
                  v-model="form.email"
                />
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-phone"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input type="text" required placeholder="Phone Number" v-model="form.phone"/>
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-briefcase"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input type="text" required placeholder="Business" v-model="form.business"/>
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icons cui-globe"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-select :options="countryOptions" required v-model="form.country">
                  <template slot="first">
                    <option :value="null" disabled>Country</option>
                  </template>
                </b-form-select>
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icons cui-location-pin"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  type="number"
                  required
                  v-model="form.zipCode"
                  :min="501"
                  :max="99950"
                  placeholder="Zip Code"
                />
              </b-input-group>
              <b-button type="submit" variant="primary" block>Update Client</b-button>
            </b-form>
          </b-col>
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
      email: null,
      phone: null,
      business: null,
      country: null,
      zipCode: null
    },
    countryOptions: require("@/_countries.json")
  }),

  created() {
    const id = this.$route.params.id;
    const client = this.$store.getters["clientStore/getClient"](id);
    this.form = {
      name: client.name,
      email: client.email,
      phone: client.phone,
      business: client.business,
      country: client.country,
      zipCode: client.zip_code
    };
  },

  methods: {
    onSubmit() {
      const { name, email, phone, business, country, zipCode } = this.form;
      const id = this.$route.params.id;
      if (name && email && phone && business && country && zipCode) {
        this.$store
          .dispatch("clientStore/updateClient", {
            formData: { ...this.form },
            id
          })
          .then(() => this.$router.push({ name: "Clients" }))
          .catch(e => console.error(e));
      }
    }
  }
};
</script>
