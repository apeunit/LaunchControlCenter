<template>
  <v-form @submit.prevent="submit" v-model="valid" ref="form">
    <v-container class="d-flex align-center">
     <v-container class="d-flex justify-start">    
     <h1>New Infrastructure</h1> 
     </v-container>
       <v-container class="d-flex justify-end">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="390"
    >
      <template v-slot:activator="{ on, attrs }">
         <v-btn
         elevation="2"
         type="submit"
         class="my-6 d-flex justify-end mr-2"
         outlined
         color="green darken-2"
         :loading="loading"
         >Save Event</v-btn>
        
        <v-btn
          v-bind="attrs"
          v-on="on"
          elevation="2"
          class="my-6 d-flex justify-end"
          outlined
          color="blue-grey"
        >
          Cancel
        </v-btn>
      </template>

      <v-card class="px-6 py-4">
        <v-card-title class="headline">
       Are you sure that you want to cancel the new event?        
      </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black"
            outlined
            text
            type="submit"
          @click.prevent="cancel"  
           :loading="loading">     
            yes
          </v-btn>      
         <v-btn
            color="black"
            outlined
            text
            @click="dialog = false"
          >
          No          
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     </v-container>
     </v-container>

    <v-card class="pa-6 mb-6">
     <v-card-title>Create your event Infrastructure</v-card-title>
     <p class="px-4 pb-4">Here you can set the presets of your event infrastructure. 
       This doesn’t mean, that your infrastructure is fully deployed yet. 
       After Saving you have to go to the settings of the created infrastructure and fully deploy it there!</p> 
     </v-card>

    <v-sheet>
    <v-card class="my-4 pa-6">
      <v-card-title>Give a name to your token symbol</v-card-title>
      <p class="px-4">As part of your event infrastructure tokens will be created. Please choose a name for your tokens.</p>
      <v-card-text>
        <v-container class="border">
              <v-text-field
                v-model="model.token_symbol"
                label="Token Symbol"
                value="DROPS"
              ></v-text-field>
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
    </v-sheet>
    <v-container class="border">
      <v-card class="pa-6">
      <v-row class="border">
        <v-col cols="12" md="12">
          <v-card-title>Genesis Accounts</v-card-title>
         <p class="px-5 pb-2 border">
          Genesis accounts can control the event infrastructure. 
          Please provide an email address of all users who should be able to control the 
          event infrastructure. Genesis accounts also receive the amount of tokens specified 
          in these settings. From the Genesis accounts, the tokens can be distributed 
          to your event participants.</p> 
          <v-btn @click="addGenesis()" 
          class="mx-5 mb-6" 
          outlined 
          elevation="2"
          color="blue darken-4">
            <v-icon dark> mdi-plus </v-icon>
            additional genesis account
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
          v-for="(g, n) in model.genesis_accounts"
          :key="n"
        >
        <v-sheet rounded elevation="2" class="ma-4">
          <v-expansion-panels class="mb-4 pa-8">
           <v-card-text class="black--text">
              <h3 class="pt-2">New Genesis Account</h3>
              <p class="py-4">
              As part of your event infrastructure tokens will be created. Please choose a name for your tokens.</p>
              <v-text-field v-model="g.name" label="E-Mail"                 
              class="py-4"></v-text-field>
              <v-text-field
                class="py-4"
                hint="Main token balance"
                v-model="g._amount_token"
                :suffix="`${model.token_symbol}`"
                label="Genesis Token Balance"
              ></v-text-field>
            <v-expansion-panel class="mb-6 border-none rounded-lg">
          <v-expansion-panel-header>Advanced Settings</v-expansion-panel-header>
        <v-expansion-panel-content>
           <v-text-field
               class="py-4"
               v-model="g._amount_gas"
               label="Gas Token Balance"
               :suffix="`${token_gas_symbol}`"
               hint="balance for tokens used to pay for gas"
          > </v-text-field>
            <v-text-field
                class="py-4"
                v-model="g._amount_stake"
                label="Stake"
                :suffix="`${token_stake_symbol}`"
                hint="stake assigned to the account"
              ></v-text-field>
                <v-sheet class="pb-8 pl-2">
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
        </v-expansion-panel-content>
        </v-expansion-panel>
          <v-btn @click="removeGenesis(n)" 
              outlined
              class="mx-2 my-4" 
              dark color="red" 
              elevation="2">
                <v-icon dark> mdi-minus </v-icon>
                remove
           </v-btn>
         </v-card-text>
         <!-- </v-card> -->
        </v-expansion-panels>
        </v-sheet>
        </v-col>
      </v-row>
      </v-card>
    </v-container>  
  </v-form>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: "WorkspacesCreate",
  data() {
    return {
      dialog: false,
      valid: false,
      token_gas_symbol: "evtx",
      token_stake_symbol: "stake",
      model: {
        token_symbol: "DROPS",
        genesis_accounts: [
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

    },
    removeGenesis(n) {
      this.$delete(this.model.genesis_accounts, n);
    },
    ...mapActions([
      'createEvent'
    ])
  },
  mounted() {
      this.model.genesis_accounts.push({
      name: this.authName,
      genesis_balance: "",
      faucet: true,
      validator: true,
      _amount_token: 500,
      _amount_gas: 1000000,
      _amount_stake: 100000000,
      })

    this.model.owner = this.authName
  }
}
</script>

<style scoped>
.border {
  border: solid black 1px,
}

.border-none {
  border: none,
}
</style>
