<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                class="mb-3"
                :value="loginEmail"
                @input="setLoginEmail"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

              <v-text-field
                class="mb-3"
                :value="loginPassword"
                @input="setLoginPassword"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                :rules="[rules.required, rules.min]"
                :type="show ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show = !show"
              ></v-text-field>
            </v-form>
            <v-card-actions>
              <v-flex>
                <p class="my-3">
                  Are you new here?
                  <router-link :to="{ name: 'register'}">Create an account.</router-link>
                </p>

                <v-btn
                  :loading="loading"
                  :disabled="!valid || loading"
                  class="mt-4"
                  outline
                  block
                  color="primary"
                  @click="login"
                >
                  <v-icon class="mr-2">fingerprint</v-icon>Login
                </v-btn>
              </v-flex>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar :value="loginError" top color="error">{{ loginError }}</v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

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

  computed: {
    ...mapState(["loginEmail", "loginPassword", "loginError", "loading"])
  },

  methods: {
    ...mapMutations(["setLoginEmail", "setLoginPassword"]),
    ...mapActions(["login"])
  }
};
</script>

<style scoped>
</style>
