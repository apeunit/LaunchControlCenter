<template>
  <v-form
    @submit.prevent="submit"
    v-model='valid'
    ref="form"
  >
    <h1>Create Event</h1>
    <v-card
      class="my-4"
    >
      <v-card-title>Event</v-card-title>
      <v-card-text>
        <v-container>
          <v-row justify="space-between">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="model.token_symbol"
                label="Token Symbol"
              ></v-text-field>
              <v-text-field
                v-model="model.owner"
                label="Owner Email"
              ></v-text-field>
              <v-text-field
                v-model="model.provider"
                label="Provider"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <v-card
      class="my-4"
    >
      <v-card-title>Event Payload</v-card-title>
      <v-card-text>
        <v-container>
          <v-row justify="space-between">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="model.payload.binary_path"
                label="Binary Path"
              ></v-text-field>
              <v-text-field
                v-model="model.payload.binary_url"
                label="Binary Url"
              ></v-text-field>
              <v-text-field
                v-model="model.payload.cli_path"
                label="Cli Path"
              ></v-text-field>
              <v-text-field
                v-model="model.payload.daemon_path"
                label="Daemon Path"
              ></v-text-field>
              <v-text-field
                v-model="model.payload.docker_image"
                label="Docker Image"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <h2>Event Genesis Accounts</h2>
    <v-container>
      <v-row>
        <v-col
          cols="12" md="4"
          v-for='(g,n) in model.genesis_accounts'
          :key='g.name'
        >
          <v-card>
            <v-card-text>
              <v-text-field
                v-model="g.name"
                label="Name"
              ></v-text-field>
              <v-text-field
                v-model="g.genesis_balance"
                label="Genesis Balance"
              ></v-text-field>
              <v-switch
                v-model="g.faucet"
                :label="`Faucet: ${g.faucet.toString()}`"
              ></v-switch>
              <v-switch
                v-model="g.validator"
                :label="`Validator: ${g.validator.toString()}`"
              ></v-switch>
              <v-btn
                @click='removeGenesis(n)'
                class="mx-2"
                dark
                color="red"
              >
                <v-icon dark>
                  mdi-minus
                </v-icon>
                remove
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12" md="4"
        >
          <v-btn
            @click='addGenesis()'
            class="mx-2"
            dark
            color="indigo"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
            add genesis account
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-btn
      elevation="2"
      type="submit"
      class="my-6"
    >Save Event</v-btn>
  </v-form>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: 'WorkspacesCreate',
  data () {
    return {
      valid: false,
      model: {
        owner: "string",
        provider: "string",
        token_symbol: "string",
        payload: {
          binary_path: "string",
          binary_url: "string",
          cli_path: "string",
          daemon_path: "string",
          docker_image: "string"
        },
        genesis_accounts: [
          {
            name: "Genesis Account #1",
            genesis_balance: "10000",
            faucet: true,
            validator: true
          }
        ],
      }
    }
  },
  methods: {
    submit() {
      this.createEvent(this.model)
        .then(result =>{
          console.log(result)
          this.$router.replace('/events/')
        })
    },
    addGenesis() {
      this.model.genesis_accounts.push({
        name: `Genesis Account #${this.model.genesis_accounts.length+1}`,
        genesis_balance: "1000",
        validator: true,
        faucet: true
      })
    },
    removeGenesis(n) {
      this.$delete(this.model.genesis_accounts, n)
    },
    ...mapActions([
      'createEvent'
    ])
  }
}
</script>
