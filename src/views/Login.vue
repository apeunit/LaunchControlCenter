<template>
  <div class="login">
    <template v-if='authName'>
      <h1>Logout</h1>
      <p>You are logged in as {{authName}}</p>
      <v-btn @click='logout'>Logout</v-btn>
    </template>
    <template v-else>
      <h1>Login</h1>
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
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
      <router-link to='/register'>
        Register for account
      </router-link>
    </template>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: "Login",
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
  computed: {
    ...mapState([
      'authName'
    ])
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    submit() {
      this.authLogin({
        email: this.email,
        pass: this.password
      })
    },
    logout() {
      this.authLogout()
    },
    ...mapActions([
      'authLogin',
      'authLogout'
    ])
  }
}
</script>
