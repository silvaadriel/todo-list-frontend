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

                <v-checkbox
                  v-model="checkbox"
                  :rules="[v => !!v || 'You must agree to continue!']"
                  label="I agree to the terms."
                  required
                ></v-checkbox>
                <div>
                  <v-btn
                    class="mt-4"
                    :disabled="!valid"
                    outline
                    block
                    color="primary"
                    @click="register"
                  >
                    <v-icon class="mr-2">account_circle</v-icon>Register
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
      "registerError"
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
  height: 91vh;
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
