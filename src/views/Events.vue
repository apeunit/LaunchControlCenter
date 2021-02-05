<template>
  <v-row>
    <v-col>
      <h1>Events</h1>
        <v-btn
          :to="`/events/create`"
          class="ma-2"
          fab
          dark
          color="indigo"
          >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
        <template v-if='events'>
          <v-card
            tile
            class="my-4 pa-6"
            v-for='event in events'
            :key='event.id'
          >
            <v-card-title class="pb-6">
              Token Symbol: {{event.token_symbol}}
            </v-card-title>
            <!-- <v-card-subtitle>
              {{event.id}}
            </v-card-subtitle> -->
            <v-card-text class="pb-1">
              Starts on: {{event.starts_on | luxon}}
            </v-card-text>
            <v-card-text class="pb-6">
              Ends on: {{event.ends_on | luxon}}
            </v-card-text>
            <v-card-actions>
              <v-btn
              justify-self="space-between"
              outlined tile 
                :to="`/event/${event.id}`"
              >
                Select
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
        <template v-else>
          <v-alert
            border="bottom"
            colored-border
            type="info"
            elevation="2"
          >
          <p>
            Pease click the plus button below and create a new event
          </p>
          </v-alert>
        </template>

        <!-- <v-btn
          :to="`/events/create`"
          class="ma-2"
          fab
          dark
          color="indigo"
          >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn> -->

    </v-col>
  </v-row>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'events'
    ])
  },
  methods: {
    ...mapActions([
      'loadEvents'
      ])
  },
  mounted() {
    this.loadEvents()
  }
}
</script>
