<template>
  <v-app>
    <v-toolbar
      color="white"
    >
        <v-toolbar-items class="hidden-sm-and-down">
        <v-container class="d-flex flex-row green">
				<v-btn 
        outlined 
        to='/'>Home</v-btn>
        <v-btn
        outlined
        flat
        to='/events'>Infrastructures</v-btn>
        <v-btn
        outlined
        flat
        to='/about'>About</v-btn>
       </v-container>
       <v-spacer></v-spacer>
       <v-container class="grey justify-self-end">
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
      </v-container>
      </v-toolbar-items>

    <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
            <v-list>
              <v-list-tile>
              <v-list-tile-content>
                HOME
                </v-list-tile-content>
                <v-list-tile-content>
                INFRASTRUCTURES
                </v-list-tile-content>
                <v-list-tile-content>
                 ABOUT
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
        </v-menu>
        </v-toolbar>

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


<style scoped>

.router-link a{
    text-decoration: none;
}
</style>