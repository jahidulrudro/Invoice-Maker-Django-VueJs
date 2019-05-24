<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8" lg="4">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="onSubmit">
                  <h1 class="text-center">Login</h1>
                  <p class="text-muted text-center">Sign In to your account</p>
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
                      v-model="username"
                      :class="{
                        'has-error': error
                      }"
                      @input="error = false"
                      autofocus
                    />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      autocomplete="current-password"
                      v-model="password"
                      :class="{
                        'has-error': error
                      }"
                      @input="error = false"
                    />
                    <b-form-invalid-feedback :force-show="true" v-if="error">
                      <i class="fa fa-warning"></i>
                      Invalid Username and Password!
                    </b-form-invalid-feedback>
                  </b-input-group>
                  <b-row>
                    <b-col cols="4">
                      <b-button variant="primary" class="px-4" type="submit">
                        <i class="fa fa-spinner fa-spin" v-if="submitting"></i>
                        <template v-else>Login</template>
                      </b-button>
                    </b-col>
                    <b-col cols="8" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    username: "",
    password: "",
    error: false,
    submitting: false
  }),

  methods: {
    onSubmit() {
      this.submitting = true;
      this.$store
        .dispatch("login", {
          username: this.username,
          password: this.password
        })
        .then(msg => {
          console.log(msg);
          this.$router.push({ name: "Home" });
        })
        .catch(e => {
          this.error = true;
          this.submitting = false;
          console.error(e);
        });
    }
  }
};
</script>

<style scoped>
.form-control.has-error {
  border-color: #ef7681;
}
.form-control.has-error:focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 186, 186, 0.63);
}
.input-group .form-control {
  border-top-right-radius: 0.25rem !important;
  border-bottom-right-radius: 0.25rem !important;
}
</style>
