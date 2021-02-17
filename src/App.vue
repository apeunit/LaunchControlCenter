<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      elevation="2" 
      flat
    >
      <v-container class="py-0 fill-height d-flex justify-start">
				<v-btn 
        class="mr-2"
        outlined
        text to='/'>Home</v-btn>
        <v-btn
        class="mx-2" 
        outlined
        text to='/events'>Events</v-btn>
        <v-btn
        class="mx-2"  
        outlined
        text to='/about'>About</v-btn>
      </v-container>
       <v-container class="d-flex justify-end">
      <v-btn
       outlined
      >
      <router-link to="/login">
        <template v-if='authName'>
          profile       
          </template>
        <template v-else>
          login
        </template>
      </router-link>
      </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-2">
      <v-container>
				<router-view></router-view>
      </v-container>
    </v-main>

   <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      class="indigo lighten-1 white--text text-center"
      width="100vw"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong> version: {{ status }}</strong>
      </v-card-text>
    </v-card>
  </v-footer>
  </v-app>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'App',
  data: () => ({
        icons: [
        'mdi-github',
        'mdi-robot-excited-outline',
      ],
  }),
  methods: {
    ...mapActions([
      'loadHealth'
    ]),
  },
  computed: {
     ...mapState([
       'authName',
      ]),
      status() {
      let status = this.$store.state.status;
      let statusVer = status.version
        return statusVer;
   
      }
  },
  mounted() {
    this.loadHealth()
  }
};
</script>


