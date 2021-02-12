<template>
  <v-card>
    <v-toolbar 
          outlined
          tile  
          color="darkolivegreen" dark flat>
      <v-toolbar-title>
        <h3>Event: {{ id }}</h3>
      </v-toolbar-title>
      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider></v-tabs-slider>
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab"> 
      <v-tab-item class="ma-4 pa-4">
         <h2>Settings</h2>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                    Name
                </th>
                <th class="text-left">
                    Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>id</td>
                <td>{{event.id}}</td>
              </tr>
              <tr>
                <td>token symbol</td>
                <td>{{event.token_symbol}}</td>
              </tr>
              <tr>
                <td>owner</td>
                <td>{{event.owner}}</td>
              </tr>
              <tr>
                <td>provider</td>
                <td>{{event.provider}}</td>
              </tr>
              <tr>
                <td>created on</td>
                <td>{{event.created_on | luxon }}</td>
              </tr>
              <tr>
                <td>starts on</td>
                <td>{{event.starts_on | luxon }}</td>
              </tr>
              <tr>
                <td>ends on</td>
                <td>{{event.ends_on | luxon }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
    </v-tab-item>
    <v-tab-item class="ma-4 pa-4">
       <h2>Accounts:</h2>
       <v-container class="d-flex flex-wrap">
        <v-card
          class="my-4 mx-4"
          width="25vw"
          elevation="6"
          v-for="a in event.accounts"
          :key="a.name"
        >
        <v-card-title>
           {{a.name}}
          </v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Name
                    </th>
                    <th class="text-left">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>address</td><td>{{a.address}}</td></tr>
                  <tr><td>genesis balance</td><td>{{accountsSel[0].join(" ")}}</td></tr>
                  <tr><td>gas balance</td><td>{{accountsSel[1].join(" ")}}</td></tr>
                  <tr><td>stake</td><td>{{accountsSel[2].join(" ")}}</td></tr>
                  <tr><td>validator</td><td>{{a.validator}}</td></tr>
                  <tr><td>faucet</td><td>{{a.faucet}}</td></tr>
              </tbody>
            </template>
          </v-simple-table>
          </v-card-text>
        </v-card>
         </v-container>
        </v-tab-item>
      <v-tab-item class="ma-4 pa-4">
        <h2 class="pb-4">Deploy your event here</h2>
        <p>
          Deploy can not be undone. 
        </p>
        <p>
          The operation can take a up to 30 seconds.
        </p>
     <v-dialog 
      v-if="deployError"
      v-model="errorDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Error
        </v-card-title>
        <v-card-text>
          {{deployError}}
        </v-card-text>
           <v-card-text>
        Please try to deploy again.
          </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
        <v-btn @click.stop="deployDialog = true"  
        outlined
        tile 
        dark color="green"> Deploy </v-btn>
         <v-dialog
      v-model="deployDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          You are about to <br>deploy this event.
        </v-card-title>
        <v-card-text>
          Are you sure you want to proceed?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="blue darken-1"
            text
            @click="deployDialog = false"
          >
            No
          </v-btn>

          <v-btn
            color="blue darken-1"
            text
            @click="deploy"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

      </v-tab-item>

      <v-tab-item class="ma-4 pa-4">
        <h2 class="pb-4">Delete your event here</h2>
        <p>Deleting can not be undone.</p>
        <v-btn @click.stop="deleteDialog = true"            
            outlined 
            tile 
            dark 
            color="red"> Delete </v-btn>
         <v-dialog
      v-model="deleteDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          You are deleting <br>this event.
        </v-card-title>
        <v-card-text>
          Are you sure you want to proceed?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="blue darken-1"
            tile
            @click="deleteDialog = false"
          >
            No
          </v-btn>

          <v-btn
            color="blue darken-1"
            text
            @click="destroy"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-tab-item>
    </v-tabs-items>
       
  </v-card>

      
</template>
<script>
import { mapActions, mapState } from "vuex"
export default {
  name: "Event",
  data() {
    return {
      tab: null,
      deployError: null,
      items: [
        'Settings',
        'Accounts',
        'Deploy',
        'Delete'
      ],
       deployDialog: false,
       deleteDialog: false,
       errorDialog: false,
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    event() {
      return this.events.filter((e) => e.id === this.id)[0]
    },
    
    accountsSel() {
      const accountValues = Object.values(this.event.accounts)[0]
      const valuesObj = Object.values(accountValues)[2].match(/\d+[a-z]+/ig).map(m => { return { 
     val: m.match(/\d+/)[0],
     sym: m.match(/\D+/)[0],
 }
})   
      const valArr = valuesObj.map(val => Object.values(val))
      return valArr
 },

    ...mapState([
      'events',
      'loading'
    ])
  },
  methods: {
    destroy() {
        this.deleteEvent(this.id)
          .then(() => {
            this.$router.replace('/events/')
            this.dialog = false
          })
    },
    deploy() {
        this.deployEvent(this.id)
          .then(result => {
            if(typeof result.code !== 'undefined') {
              if(result.code === 500) {
                this.deployError = result.message
                this.errorDialog = true
              }
            }
           this.deployDialog = false
          })
    },
    ...mapActions(["loadEvent", "deleteEvent", "deployEvent"]),
  },
  mounted() {
    this.loadEvent(this.id);
  },
}
</script>
