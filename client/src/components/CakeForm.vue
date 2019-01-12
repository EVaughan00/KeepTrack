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
            <v-layout row>
              <v-flex xs6>
                <div>
                  <input style="float: left; margin-left: 5vw;" type="checkbox" id="TDD" value="Tall Dark and Delicious" v-model="checkedCakes">
                  <label style="float: left;" for="jack">Tall Dark and Delicious</label>
                  <br>
                  <input style="float: left; margin-left: 5vw;" type="checkbox" id="MD" value="Midnight Delight" v-model="checkedCakes">
                  <label style="float: left;" for="mike">Midnight Delight</label>
                  <br>
                  <input style="float: left; margin-left: 5vw;" type="checkbox" id="C&C" value="Cookies and Creamery" v-model="checkedCakes">
                  <label style="float: left;" for="mike">Cookies and Creamery</label>
                </div>
              </v-flex>
              <v-flex xs6>
                <div>
                  <input style="float: left; margin-left: 5vw;" type="checkbox" id="CBC" value="Cake Batter Confetti" v-model="checkedCakes">
                  <label style="float: left;" for="john">Cake Batter Confetti</label>
                  <br>
                  <input style="float: left; margin-left: 5vw;" type="checkbox" id="SP" value="Strawberry Passion" v-model="checkedCakes">
                  <label style="float: left;" for="mike">Strawberry Passion</label>
                  <br>
                  <input style="float: left; margin-left: 5vw;" type="checkbox" id="MINT" value="Mint Chocolate Chip" v-model="checkedCakes">
                  <label style="float: left;" for="john">Mint Chocolate Chip</label>
                </div>
              </v-flex>
          </v-layout>
          <h2>Select Cake Size</h2>
          <v-layout row>
            <v-flex xs6>
              <div>
                <input style="float: left; margin-left: 10vw;" type="checkbox" id="large" value="Large" v-model="checkedSize">
                <label style="float: left;" for="john">Large Round</label>
              </div>
            </v-flex>
            <v-flex xs6>
              <div>
                <input style="float: left; margin-left: 4vw;" type="checkbox" id="small" value="Small" v-model="checkedSize">
                <label style="float: left;" for="john">Small Round</label>
              </div>
            </v-flex>
        </v-layout>
            <br>
            <br>
            <span style="font-size: 20px;">Selected Cake: {{ checkedSize[0] }} {{ checkedCakes[0] }}</span>
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
      checkedCakes: [],
      checkedSize: []
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
        cake: this.checkedCakes[0],
        size: this.checkedSize[0]
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
