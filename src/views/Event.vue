<template>
  <v-card >
    <v-toolbar
      color="indigo"
      dark
      flat
    >
      <v-toolbar-title>
        <h3>Event: {{id}}</h3>
      </v-toolbar-title>
      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider ></v-tabs-slider>
          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item
        class="pa-4"
      >
        <h2>Settings</h2>
        <p>id: {{event.id}}</p>
        <p>token_symbol: {{event.token_symbol}}</p>
        <p>owner: {{event.owner}}</p>
        <p>provider: {{event.provider}}</p>
        <p>created_on: {{event.created_on}}</p>
        <p>starts_on: {{event.starts_on}}</p>
        <p>ends_on: {{event.ends_on}}</p>

        <h2>Accounts:</h2>

        <v-card
          class="my-4"
          elevation="6"
          v-for="a in event.accounts"
          :key='a.name'
        >
          <v-card-title>
            address: {{a.address}}
          </v-card-title>
          <v-card-text>
            <p>name: {{a.name}}</p>
            <p>genesis_balance: {{a.genesis_balance}}</p>
            <p>validator: {{a.validator}}</p>
            <p>faucet: {{a.faucet}}</p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item
        class="pa-4"
      >
        <h2>Deploy</h2>
        <p>
          Deploy can not be undone.
        </p>
        <v-alert
          v-if="deployError"
          text
          prominent
          type="error"
          border="right"
          icon="mdi-cloud-alert"
        >
          <h3>Error</h3>
          <p>
           {{deployError}}
          </p>
          <p>
           Please try to deploy again.
          </p>
        </v-alert>
        <v-btn
          @click="deploy"
          dark
          :loading="loading"
          :disabled="loading"
          color="green"
        >
          Deploy
        </v-btn>
      </v-tab-item>

      <v-tab-item
        class="pa-4"
      >
        <h2>Delete</h2>
        <p>Deleting can not be undone.</p>
        <v-btn
          @click="destroy"
          dark
          color="red"
        >
          Delete
        </v-btn>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import { mapActions, mapState} from 'vuex'
export default {
  name: 'Event',
  data () {
    return {
      tab: null,
      deployError: null,
      items: [
        'Settings',
        'Deploy',
        'Delete'
      ],
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    event() {
      return this.events.filter(e=>e.id===this.id)[0]
    },
    ...mapState([
      'events',
      'loading'
    ])
  },
  methods: {
    destroy() {
      if(confirm('Are you sure you want to delete this event?'))
        this.deleteEvent(this.id)
          .then(() => {
            this.$router.replace('/events/')
          })
    },
    deploy() {
      if(confirm('Are you sure you want to deploy this event?'))
        this.deployEvent(this.id)
          .then(result => {
            if(typeof result.code !== 'undefined') {
              if(result.code === 500) {
                this.deployError = result.message
              }
            }
          })
    },
    ...mapActions([
      'loadEvent',
      'deleteEvent',
      'deployEvent'
    ])
  },
  mounted() {
    this.loadEvent(this.id)
  }
}
</script>
