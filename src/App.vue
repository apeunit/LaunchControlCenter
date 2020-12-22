<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
				<v-btn text to='/'>Home</v-btn>
        <v-btn text to='/events'>Events</v-btn>
        <v-btn text to='/about'>About</v-btn>
      </v-container>
      <router-link to="/login">
        <template v-if='authName'>
          {{authName}}
        </template>
        <template v-else>
          login
        </template>
      </router-link>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
				<router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'App',
  data: () => ({
    //
  }),
  methods: {
    ...mapActions([
      'loadHealth'
    ])
  },
  computed: {
     ...mapState([
       'authName'
     ])
  },
  mounted() {
    this.loadHealth()
  }
};
</script>
