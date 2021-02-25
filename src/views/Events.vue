<template>
  <v-row>
    <v-col>
      <h1 class="py-6"> <v-icon large color="red">mdi-domain</v-icon> Your Event Infrastructures </h1>
        <v-btn
          :to="`/events/create`"
          class="ma-4"
          elevation="2"
          outlined
          color="blue darken-4"
          >
          <v-icon dark>
            mdi-plus 
          </v-icon>
          add new infrastructure
        </v-btn>
        <template v-if='events'>
          <container class="d-flex flex-wrap">
          <v-card
            width="400"
            class="ma-4 pa-6"
            v-for='event in events'
            :key='event.id'
          >
            <v-card-title class="pb-6">
              Token symbol name: {{event.token_symbol}}
            </v-card-title>
            <v-card-text class="pb-1">
              Event starts on: {{event.starts_on | luxon}}
            </v-card-text>
            <v-card-text class="pb-6">
              Event ends on: {{validEndDate}}
            </v-card-text>
            <v-card-actions>
              <v-btn
              class="ml-2 mb-4"
              justify-self="space-between"
              outlined
              elevation="2"
                :to="`/event/${event.id}`"
              >
                Select
              </v-btn>
            </v-card-actions>
          </v-card>
            </container>
        </template>
        <template v-else>
          <v-alert
            border="bottom"
            colored-border
            type="info"
            elevation="2"
          >

          <p>
            Please click the plus button below and create a new event
          </p>
          </v-alert>
        </template>
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
    ]),
    validEndDate() {
    let evnts = this.events;
    let evObjStart = {};
    let evObjEnd = {};
    let endDateStr = ""
   
    evnts.forEach(evnt => { evObjStart[evnt.id] = evnt.starts_on })
    evnts.forEach(evnt => { evObjEnd[evnt.id] = evnt.ends_on })

   for (let key in evObjStart){
     endDateStr = Object.keys(evObjEnd).includes(key) && evObjEnd[key] > evObjStart[key] ? this.$luxon(evObjEnd[key]) : "-";
     }

   return endDateStr;
    },
  },
  methods: {
    ...mapActions([
      'loadEvents'
      ]),
  },

  mounted() {
    this.loadEvents()
  }
}
</script>