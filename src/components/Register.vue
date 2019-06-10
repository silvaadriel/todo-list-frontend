<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                class="mb-3"
                :value="registerUserName"
                @input="setRegisterUserName"
                :rules="nameRules"
                label="Name"
                required
              ></v-text-field>

              <v-text-field
                class="mb-3"
                :value="registerEmail"
                @input="setRegisterEmail"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

              <v-text-field
                class="mb-3"
                :value="registerPassword"
                @input="setRegisterPassword"
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
                <v-checkbox
                  v-model="checkbox"
                  :rules="[v => !!v || 'You must agree to continue!']"
                  label="I agree to the terms."
                  required
                ></v-checkbox>

                <v-btn
                  class="mt-4"
                  :loading="loading"
                  :disabled="!valid || loading"
                  outline
                  block
                  color="primary"
                  @click="register"
                >
                  <v-icon class="mr-2">account_circle</v-icon>Register
                </v-btn>
              </v-flex>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar :value="registerError" top color="error">{{ registerError }}</v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "Register",
  data: () => ({
    valid: true,
    name: "",
    nameRules: [v => !!v || "Name is required"],
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
    },
    checkbox: false
  }),
  computed: {
    ...mapState([
      "registerUserName",
      "registerEmail",
      "registerPassword",
      "registerError",
      "loading"
    ])
  },
  methods: {
    ...mapMutations([
      "setRegisterUserName",
      "setRegisterEmail",
      "setRegisterPassword",
      "setRegisterError"
    ]),
    ...mapActions(["register"]),
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
  height: 500px;
}
.resultContainer .v-form {
  width: 380px;
  height: 380px;
}
.resultContainer .v-text-field {
  height: 50px;
}
.resultContainer .v-input--checkbox {
  height: 150px;
}
</style>
