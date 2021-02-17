<template>
  <div class="home">
    <h1 class="py-6"> Event-Infrastructure Deployment Center <v-icon large>mdi-fire</v-icon></h1>
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
          <v-icon dark> mdi-domain </v-icon> create your infrastructure here
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
