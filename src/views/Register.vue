<template>
  <div class="register">
    <h1>Register</h1>

    <v-form
      @submit.prevent="submit"
      v-model='valid'
      ref='form'
    >
      <v-card
        class='my-6 py-1 px-3'
        max-width="450"
      >
        <v-card-text>
          <v-text-field
            label="Email"
            :rules="emailRules"
            placeholder=""
            clearable
            required
            type="email"
            v-model="email"
            >
          </v-text-field>
          <v-text-field
            label="Password"
            @click:append="() => (pwVisible = !pwVisible)"
            :rules="passwordRules"
            placeholder=""
            required
            v-model="password"
            :type="pwVisible ? 'text' : 'password'"
            >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="!valid"
            type="submit"
          >
            Register
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: "Register",
  data() {
    return {
      valid: false,
      pwVisible: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      email: "",
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      password: "",
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    submit() {
      this.authRegister({
          email: this.email,
          pass: this.password
      })
    },
    ...mapActions([
      'authRegister'
    ])
  }
}
</script>
