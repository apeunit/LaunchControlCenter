<template>
  <div class="home">
    <h1 class="py-6"> <v-icon large color="red">mdi-fire</v-icon> Event-Infrastructure Deployment Center </h1>
   <v-card class="pa-8 my-4">
    <p>
With this tool you can easily deploy a blockchain infrastructure for your event! Among other things, this enables you to create tokens which you can distribute to your event visitors.
    </p>
    <v-btn
          :to="`/events`"
          class="my-4"
          elevation="2"
          outlined
          color="blue darken-4"
          >
          <v-icon dark class="pr-2"> mdi-domain </v-icon> start creating your infrastructure
        </v-btn>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
}
</script>
