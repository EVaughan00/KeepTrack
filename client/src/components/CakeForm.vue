<template>
  <v-layout row wrap>
    <PageHeader />
      <v-flex xs6 offset-xs3>
        <div class="white elevation-2">
          <v-toolbar flat dense class="indigo darken-1" dark>
            <v-toolbar-title>Cake Form</v-toolbar-title>
          </v-toolbar>
        </div>
        <v-flex xs12 style="border: 2px solid grey;">
        <div>
          <v-layout row>
            <v-flex xs10 offset-xs1>
              <v-text-field
              label="Customer Name"
              v-model="CName"
              ></v-text-field>
              <v-text-field
              label="Due Date (ex: Thursday 10/12)"
              v-model="DueDate"
              ></v-text-field>
              <h2>Select Cake Type</h2>
            </v-flex>
          </v-layout>
            <v-layout row>
              <v-flex xs6>
                <div>
                  <input style="float: left; margin-left: 35%;" type="checkbox" id="TDD" value="Tall Dark and Delicious" v-model="checkedCakes">
                  <label style="float: left;" for="jack">Tall Dark and Delicious</label>
                  <br>
                  <input style="float: left; margin-left: 35%;" type="checkbox" id="MD" value="Midnight Delight" v-model="checkedCakes">
                  <label style="float: left;" for="mike">Midnight Delight</label>
                  <br>
                  <input style="float: left; margin-left: 35%;" type="checkbox" id="C&C" value="Cookies and Creamery" v-model="checkedCakes">
                  <label style="float: left;" for="mike">Cookies and Creamery</label>
                </div>
              </v-flex>
              <v-flex xs6>
                <div>
                  <input style="float: left; margin-left: 35%;" type="checkbox" id="CBC" value="Cake Batter Confetti" v-model="checkedCakes">
                  <label style="float: left;" for="john">Cake Batter Confetti</label>
                  <br>
                  <input style="float: left; margin-left: 35%;" type="checkbox" id="SP" value="Strawberry Passion" v-model="checkedCakes">
                  <label style="float: left;" for="mike">Strawberry Passion</label>
                  <br>
                  <input style="float: left; margin-left: 35%;" type="checkbox" id="MINT" value="Mint Chocolate Chip" v-model="checkedCakes">
                  <label style="float: left;" for="john">Mint Chocolate Chip</label>
                </div>
              </v-flex>
          </v-layout>
          <h2>Select Cake Size</h2>
          <v-layout row>
            <v-flex xs6>
              <div>
                <input style="float: left; margin-left: 60%;" type="checkbox" id="large" value="Large Round" v-model="checkedSize">
                <label style="float: left;" for="john">Large Round</label>
              </div>
            </v-flex>
            <v-flex xs6>
              <div>
                <input style="float: left; margin-left: 20%;" type="checkbox" id="small" value="Small Round" v-model="checkedSize">
                <label style="float: left;" for="john">Small Round</label>
              </div>
            </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs6>
            <div>
              <input style="float: left; margin-left: 60%;" type="checkbox" id="largeR" value="Large Rectangle" v-model="checkedSize">
              <label style="float: left;" for="john">Large Rectangle</label>
            </div>
          </v-flex>
          <v-flex xs6>
            <div>
              <input style="float: left; margin-left: 20%;" type="checkbox" id="smallR" value="Small Rectangle" v-model="checkedSize">
              <label style="float: left;" for="john">Small Rectangle</label>
            </div>
          </v-flex>
      </v-layout>
            <br>
            <br>
            <span style="font-size: 20px;">Selected Cake: {{ checkedSize[0] }} {{ checkedCakes[0] }}</span>
            <br>
            <br>
          <v-flex xs10 offset-xs1>
            <v-text-field
            style=""
            label="Additional Information"
            type="text"
            v-model="message"
            box
            >
            </v-text-field>
          </v-flex>
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
import PageHeader from '@/components/Header.vue'
import taskService from '@/services/taskService'
export default {
  data () {
    return {
      location: '',
      CName: '',
      DueDate: '',
      message: '',
      checkedCakes: [],
      checkedSize: []
    }
  },
  components: {
    PageHeader
  },
  async mounted () {
    this.getLocation()
  },
  methods: {
    async getLocation () {
      this.verification = (await taskService.getLocation(this.$store.state.token)).data
      if (this.verification.error === 'error') {
        this.$router.push({ name: 'login' })
      } else {
        this.location = this.verification.store
      }
    },
    async newCake () {
      console.log(this.checkedCakes[0])
      const response = await cakeService.newCake({
        customerName: this.CName,
        dueDate: this.DueDate,
        message: this.message,
        cake: this.checkedCakes[0],
        size: this.checkedSize[0],
        store: this.location
      }, this.$store.state.token)
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
