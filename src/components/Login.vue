<template>
  <v-container fluid>
    <v-layout column>
      <v-flex xs12>
        <div class="resultContainer">
          <v-layout align-center justify-center row fill-height>
            <v-form class="elevation-10 px-3 py-3" ref="form" v-model="valid" lazy-validation>
              <v-layout justify-center column fill-height>
                <v-text-field
                  class="mb-3"
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>

                <v-text-field
                  class="mb-3"
                  v-model="password"
                  :append-icon="show ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required, rules.min]"
                  :type="show ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  hint="At least 8 characters"
                  counter
                  @click:append="show = !show"
                ></v-text-field>
                <div>
                  <p class="my-3">
                    Are you new here?
                    <router-link :to="{ name: 'register'}">Create an account.</router-link>
                  </p>

                  <v-btn
                    class="mt-4"
                    :disabled="!valid"
                    outline
                    block
                    color="primary"
                    @click="validate"
                  >
                    <v-icon class="mr-2">fingerprint</v-icon>Login
                  </v-btn>
                </div>
              </v-layout>
            </v-form>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\.+./.test(v) || "E-mail must be valid"
    ],
    show: false,
    password: "",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters"
    }
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  }
};
</script>

<style scoped>
.resultContainer {
  height: 91vh;
}
.resultContainer .v-form {
  width: 380px;
  height: 300px;
}
.resultContainer .v-text-field {
  height: 50px;
}
</style>
