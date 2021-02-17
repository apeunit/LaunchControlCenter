<template>
  <div class="login">
    <template v-if='authName'>
      <h1 class="py-6"><v-icon large color="red">mdi-account-circle-outline</v-icon> Welcome to your page</h1>
      <v-card class="pa-8 my-4">
      <p>You are logged in as {{authName}}</p>
      <v-btn outlined elevation="2" @click='logout'>Logout</v-btn>
       </v-card>
    </template>
    <template v-else>
      <h1 class="pt-6 pb-3"><v-icon large color="red">mdi-login-variant</v-icon> Login</h1>
      <v-form
        @submit.prevent="submit"
        v-model='valid'
        ref='form'
      >
      <v-card
        class='my-6 pa-6'
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
            elevation="2"
            outlined
            :disabled="!valid"
            type="submit"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
      
     <v-btn
          :to="`/register`"
          class="my-4"
          elevation="2"
          outlined
          color="blue darken-4"
          >
          <v-icon dark class="pr-2"> mdi-account-plus-outline </v-icon>  Register for account

        </v-btn>  
    
    
    
    
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
