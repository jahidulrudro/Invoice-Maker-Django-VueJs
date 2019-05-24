<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="7" class="mx-auto">
        <b-card>
          <b-col>
            <h1>Update Company</h1>
            <p class="text-muted">Update your Company Details</p>
            <b-form @submit.prevent="onSubmit" enctype="multipart/form-data">
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-menu"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input type="text" required placeholder="Name" v-model="form.name"/>
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
                ></b-form-input>
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-phone"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input type="text" required placeholder="Phone Number" v-model="form.phone"></b-form-input>
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-briefcase"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input type="text" required placeholder="Address" v-model="form.address"></b-form-input>
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icons cui-dollar"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  type="text"
                  required
                  placeholder="Currency"
                  v-model="form.currency"
                  :maxlength="1"
                />
              </b-input-group>

              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-picture"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-file v-model="form.logo" placeholder="Choose Logo"/>
              </b-input-group>

              <div v-if="company && company.logo" class="mt-2">
                <p class="d-inline-block mr-2">Current:</p>
                <img :src="company.logo" :alt="company.name" width="90" class="mb-1 mr-2">
                <b-form-checkbox v-model="form.clear_logo">Clear?</b-form-checkbox>
              </div>

              <b-input-group class="mb-0 mt-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-picture"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-file v-model="form.small_logo" placeholder="Choose a small Logo"/>
              </b-input-group>
              <p class="text-secondary mb-1">
                <small>Square Images are preferred for the small logo.</small>
              </p>

              <div v-if="company && company.small_logo">
                <p class="d-inline-block mr-2">Current:</p>
                <img :src="company.small_logo" :alt="company.name" width="45" class="mb-1 mr-2">
                <b-form-checkbox v-model="form.clear_small_logo">Clear?</b-form-checkbox>
              </div>

              <b-button type="submit" variant="primary" block class="mt-2">Update Company</b-button>
            </b-form>
          </b-col>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    form: {
      name: "",
      email: "",
      phone: "",
      address: "",
      currency: "",
      logo: "",
      clear_logo: false,
      small_logo: "",
      clear_small_logo: false
    },
    countryOptions: require("@/_countries.json")
  }),

  computed: {
    ...mapGetters(["company"])
  },

  created() {
    if (this.$store.state.company === null) {
      this.$store
        .dispatch("getCompanyFromApi")
        .then(data => {
          const company = data;
          this.form = {
            name: company.name,
            email: company.email,
            phone: company.phone,
            address: company.address,
            currency: company.currency
          };
        })
        .catch(e => console.error(e.response));
    } else {
      const { company } = this.$store.state;
      this.form = {
        name: company.name,
        email: company.email,
        phone: company.phone,
        address: company.address,
        currency: company.currency
      };
    }
  },

  methods: {
    onSubmit() {
      const { name, email, phone, address, currency } = this.form;
      if (name && email && phone && address && currency) {
        this.$store
          .dispatch("updateCompany", {
            formData: { ...this.form }
          })
          .then(() => this.$router.push("/"))
          .catch(e => console.error(e, e.response));
      }
    }
  }
};
</script>
