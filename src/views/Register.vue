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
        :loading="loading"
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
          <v-alert
            v-if="registerError"
            text
            prominent
            type="error"
            border="right"
            icon="mdi-cloud-alert"
          >
            <h3>Error</h3>
            <p>
              {{registerError}}
            </p>
            <p>
              Please try again.
            </p>
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="!valid || loading"
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
import {mapActions, mapState} from 'vuex'
export default {
  name: "Register",
  data() {
    return {
      registerError: false,
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
  computed: {
    ...mapState([
      'loading'
    ])
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    submit() {
      this.authRegister({
        email: this.email,
        pass:  this.password
      })
      .then(result => {
        if(typeof result.code !== 'undefined') {
          if(result.code !== 200) {
            this.registerError = result.message
          } else {
            alert('Your account was created succesfully. Pease log in now.')
            this.$router.push('/login')
          }
        }
      })
    },
    ...mapActions([
      'authRegister'
    ])
  }
}
</script>
