<template>
  <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <div class="white elevation-2">
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>Cake Form</v-toolbar-title>
          </v-toolbar>
        </div>
        <v-flex xs12>
        <div>
          <v-text-field
          label="Customer Name"
          v-model="CName"
          ></v-text-field>
          <v-text-field
          label="Due Date (ex: Thursday 10/12)"
          v-model="DueDate"
          ></v-text-field>
          <h2>Select Cake Type</h2>
          <div id='example-3'>
            <div class="left" >
              <input type="checkbox" id="TDD" value="TDD" v-model="checkedCakes">
              <label for="jack">Tall Dark and Delicious</label>
            </div>
            <label class="right" for="john">Cake Batter Confetti</label>
            <input class="right" type="checkbox" id="CBC" value="CBC" v-model="checkedCakes">
            <br>
            <br>
            <div class="left" >
              <input type="checkbox" id="C&C" value="C&C" v-model="checkedCakes">
              <label for="mike">Cookies and Creamery</label>
            </div>
            <label class="right" for="john">Mint Chocolate Chip</label>
            <input class="right" type="checkbox" id="MINT" value="MINT" v-model="checkedCakes">
            <br>
            <br>
            <div class="left" >
              <input type="checkbox" id="MD" value="MD" v-model="checkedCakes">
              <label for="mike">Midnight Delight</label>
            </div>
            <div class="right" >
              <input type="checkbox" id="SP" value="SP" v-model="checkedCakes">
              <label for="mike">Strawberry Passion</label>
            </div>
            <br>
            <br>
            <span>Selected Cake: {{ checkedCakes[0] }}</span>
            <br>
            <br>
          </div>
          <div>
            <v-text-field
            style=""
            label="Additional Information"
            type="text"
            v-model="message"
            box
            >
            </v-text-field>
          </div>
          <v-btn
          class="cyan"
          dark
          type="button"
          name="submit"
          @click="newCake"
          >Submit</v-btn>
        </div>
      </v-flex>
      </v-flex>
  </v-layout>
</template>

<script>
import cakeService from '@/services/cakeService'
export default {
  data () {
    return {
      CName: '',
      DueDate: '',
      message: '',
      checkedCakes: []
    }
  },
  components: {

  },
  methods: {
    async newCake () {
      console.log(this.checkedCakes[0])
      const response = await cakeService.newCake({
        customerName: this.CName,
        dueDate: this.DueDate,
        message: this.message,
        cake: this.checkedCakes[0]
      })
      console.log(response)
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>

<style scoped>
.left{
  float: left;
  padding-left: 280px;
}
.right{
  float: right;
  padding-right: 280px;
}
</style>
