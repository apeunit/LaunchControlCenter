<template>
  <v-form @submit.prevent="submit" v-model="valid" ref="form">
    <!-- <v-container class="d-flex justify-space-between align-center"> -->
      <v-container class="d-flex align-center">
     <v-container class="d-flex justify-start">
    <h1>Create Event</h1>
      </v-container>
       <v-container class="d-flex justify-end">
       <v-btn
      elevation="2"
      type="submit"
      class="my-6 d-flex justify-end mr-2"
       outlined
        tile
      :loading="loading"
    >Save Event</v-btn>
    <v-btn
    @click.prevent="cancel" 
      elevation="2"
      type="submit"
      class="my-6 d-flex justify-end"
       outlined
        tile
      :loading="loading"
    >Cancel</v-btn>
     </v-container>
     </v-container>
    <v-card class="mb-4 pa-6">
      <v-card-title>Event</v-card-title>
      <v-card-text>
        <v-container>
          <v-row justify="space-between">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="model.token_symbol"
                label="Token Symbol"
                value="DROPS"
              ></v-text-field>
              <!-- <v-text-field
                v-model="model.owner"
                label="Owner Email"
              ></v-text-field> -->
              <!-- <v-text-field
              ></v-text-field>
              <v-text-field
                v-if='false'
                v-model="model.provider"
                label="Provider"
              ></v-text-field> -->
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <v-card
      class="my-4"
      v-if='false'
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

    <!-- <h2>Event Genesis Accounts</h2> -->
    <v-container>
          <v-row>
        <v-col cols="12" md="4">
          <v-btn @click="addGenesis()" 
          class="mx-2" 
          outlined
          tile 
           elevation="2"
          dark color="indigo">
            <v-icon dark> mdi-plus </v-icon>
            add genesis account
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
          v-for="(g, n) in model.genesis_accounts"
          :key="n"
        >
          <v-card class="pa-6">
            <v-card-text>
              <h3 class="pt-2 pb-8">Genesis Account</h3>
              <!-- <v-text-field v-model="g.name" label="E-Mail"   -->

              <v-text-field v-model="model.owner" label="E-Mail"                 
              class="py-4"></v-text-field>
              <v-text-field
                class="py-4"
                hint="Main token balance"
                v-model="g._amount_token"
                :suffix="`${model.token_symbol}`"
                label="Genesis Token Balance"
              ></v-text-field>
              <v-text-field
                class="py-4"
                v-model="g._amount_gas"
                label="Gas Token Balance"
                :suffix="`${token_gas_symbol}`"
                hint="balance for tokens used to pay for gas"
              ></v-text-field>
              <v-text-field
                class="py-4"
                v-model="g._amount_stake"
                label="Stake"
                :suffix="`${token_stake_symbol}`"
                hint="stake assigned to the account"
              ></v-text-field>
                <v-sheet class="pa-5">
              <v-switch
                v-model="g.faucet"
                inset
                :label="`Is Faucet`"
                hint="a faucet service will be connected to this account"
              ></v-switch>
              <v-switch
                v-model="g.validator"
                inset
                :label="`Is validator`"
                hint="the account will be a validator"
              ></v-switch>
                </v-sheet>
              <v-btn @click="removeGenesis(n)" 
              outlined
              tile 
               elevation="2"
              class="mx-2" justify="center" dark color="red" >
                <v-icon dark> mdi-minus </v-icon>
                remove
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col cols="12" md="4">
          <v-btn @click="addGenesis()" class="mx-2" dark color="indigo">
            <v-icon dark> mdi-plus </v-icon>
            add genesis account
          </v-btn>
        </v-col>
      </v-row> -->
    </v-container>
    <!-- <v-btn
      elevation="2"
      type="submit"
      class="my-6"
      :loading="loading"
    >Save Event</v-btn> -->
  </v-form>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: "WorkspacesCreate",
  data() {
    return {
      valid: false,
      token_gas_symbol: "evtx",
      token_stake_symbol: "stake",
      model: {
        owner: "",
        // provider: "",
        token_symbol: "DROPS",
        // payload: {
        //   binary_path: "string",
        //   binary_url: "string",
        //   cli_path: "string",
        //   daemon_path: "string",
        //   docker_image: "string",
        // },
        genesis_accounts: [
          {
            // name: "alice@apeunit.com",
            name: "",
            genesis_balance: "",
            faucet: true,
            validator: true,
            _amount_token: 500,
            _amount_gas: 1000000,
            _amount_stake: 100000000,
          },
        ],
      },
    };
  },
  computed: {
      event() {
      return this.events.filter((e) => e.id === this.id)[0]
    },

    accountName() {
      console.log(this.model.owner) ;
      return this.model.owner;
    },
    ...mapState([
      'authName',
      'loading'
    ])
  },
  methods: {
    submit() {
      this.model.genesis_accounts = this.model.genesis_accounts.map((ga) => {
        ga.genesis_balance = `${ga._amount_token}${this.model.token_symbol},${ga._amount_gas}${this.token_gas_symbol},${ga._amount_stake}${this.token_stake_symbol}`;
        return ga;
      });
      this.createEvent(this.model)
        .then(result =>{
          console.log(result)
          this.$router.replace('/events/')
        })
    },
    cancel(){
      this.$router.replace('/events/')
    },
    addGenesis() {
      this.model.genesis_accounts.push({
        name: `Account #${this.model.genesis_accounts.length + 1}`,
        genesis_balance: "",
        validator: true,
        faucet: true,
        _amount_token: 500,
        _amount_gas: 1000000,
        _amount_stake: 100000000,
      });
      this.model.owner.push(`Account #${this.model.genesis_accounts.length + 1}`)
      console.log('model owner', this.model.owner)
      console.log('model genesis accounts', this.model.genesis_accounts)

    },
    removeGenesis(n) {
      this.$delete(this.model.genesis_accounts, n);
    },
    ...mapActions([
      'createEvent'
    ])
  },
  mounted() {
    this.model.owner = this.authName
  }
}
</script>
