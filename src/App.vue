<template>
  <v-app>
       <v-app-bar class="hidden-sm-and-down" max-height="60vh"
    > 
				<v-btn class="plain transparent mr-4"
        to='/'>Home</v-btn>
        <v-btn
        class="plain transparent mr-4"
        to='/events'>Infrastructures</v-btn>
        <v-btn
        class="plain transparent mr-4"       
        to='/about'>About</v-btn> 
        <v-spacer></v-spacer>
       <v-btn
       outlined
       class="router-link"
      >
      <router-link class="black--text" to="/login">
        <template v-if='authName'>
          profile       
          </template>
        <template v-else>
          login
        </template>
      </router-link>
      </v-btn>

    </v-app-bar>
     <v-app-bar class="hidden-md-and-up"
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>
    
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
              <v-list-item-title to='/events'>
              Home</v-list-item-title>   
          </v-list-item>
          <v-list-item>          
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>           
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>     
      </v-list>
    </v-navigation-drawer>

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
            <v-btn icon href="https://github.com/apeunit/LaunchControlCenter" class="mx-2 plain white--text transparent "><v-icon size="24px">
            mdi-github
          </v-icon></v-btn>
           <v-btn icon href="https://apeunit.com/" class="mx-2 plain white--text transparent "><v-icon size="24px">
            mdi-robot-excited-outline
          </v-icon></v-btn>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="white--text" icon>
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
  // data: () => ({
  //       icons: [
  //       'mdi-github',
  //       'mdi-robot-excited-outline',
  //     ],
  // }),

  data: () => ({
      drawer: false,
      group: null,
    }),

  methods: {
    ...mapActions([
      'loadHealth'
    ]),
      menuItems () {
      return this.menu
    } 
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


<style scoped>

.router-link a{
    text-decoration: none;
}
</style>