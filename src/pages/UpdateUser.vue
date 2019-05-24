<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="7" class="mx-auto">
        <b-card>
          <b-col>
            <b-form @submit.prevent="onSubmit">
              <h1>Update User</h1>
              <p class="text-muted">Update a User Account</p>
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-menu"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  type="text"
                  class="form-control"
                  placeholder="First Name"
                  :maxlength="30"
                  required
                  v-model="form.first_name"
                />
              </b-input-group>
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-menu"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  type="text"
                  class="form-control"
                  placeholder="Last Name"
                  :maxlength="150"
                  required
                  v-model="form.last_name"
                />
              </b-input-group>
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-user"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  autocomplete="username"
                  :maxlength="150"
                  required
                  v-model="form.username"
                />
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>@</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  autocomplete="email"
                  required
                  v-model="form.email"
                />
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-lock"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  minlength="8"
                  required
                  v-model="form.password"
                  :state="matchPasswords"
                />
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>
                    <i class="icon-lock"></i>
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  type="password"
                  class="form-control"
                  placeholder="Repeat password"
                  minlength="8"
                  v-model="form.confirm_password"
                  required
                  :state="matchPasswords"
                />
              </b-input-group>

              <div class="mb-3 mt-0">
                <b-form-checkbox v-model="form.is_active">Active?</b-form-checkbox>
                <b-form-checkbox v-model="form.is_superuser">Admin Role?</b-form-checkbox>
              </div>
              <b-button
                type="submit"
                variant="primary"
                v-if="matchPasswords && form.first_name && form.last_name && form.username && form.email"
                block
              >Update User</b-button>
              <b-button type="submit" variant="primary" v-else disabled block>Update</b-button>
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
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      is_superuser: false,
      is_active: true,
      password: "",
      confirm_password: ""
    }
  }),

  methods: {
    onSubmit() {
      const mainUsername = this.$route.params.username;
      const { first_name, last_name, email, username } = this.form;
      if (first_name && last_name && email && username) {
        this.$store
          .dispatch("userStore/updateUser", {
            formData: { ...this.form },
            username: mainUsername
          })
          .then(() => this.$router.push({ name: "Users" }))
          .catch(e => console.error(e.response));
      }
    }
  },

  created() {
    const username = this.$route.params.username;
    const user = this.$store.getters["userStore/getUser"](username);
    this.form = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      is_superuser: user.is_superuser,
      is_active: user.is_active
    };
  },

  computed: {
    matchPasswords() {
      return this.form.password
        ? this.form.password === this.form.confirm_password
        : null;
    }
  }
};
</script>
