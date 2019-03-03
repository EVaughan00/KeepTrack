<template>
  <v-container grid-list-xl>
  <v-layout row wrap>
    <PageHeader />
      <v-flex>
        <div class="white elevation-0">
          <v-toolbar flat dense class="indigo darken-1" dark>
            <v-toolbar-title>Cake Form</v-toolbar-title>
          </v-toolbar>
        <v-flex xs12 style="border: 2px solid grey;">
        <div>
          <v-layout row>
            <v-flex xs10 offset-xs1>
              <v-text-field
              label="Customer Name"
              v-model="CName"
              ></v-text-field>
              <v-text-field
              label="Day of week"
              v-model="DOW"
              ></v-text-field>
              <v-layout row>
                <v-flex xs4 offset-xs1>
                  <v-select
                  :items="months"
                  label="Month Due"
                  v-model="month"
                  ></v-select>
                </v-flex>
              <v-flex xs4 offset-xs2>
                <v-select
                :items="days"
                label="Day Due"
                v-model="day"
                ></v-select>
              </v-flex>
            </v-layout>
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
      </div>
      </v-flex>
    <v-flex xs12>
        <div class="white elevation-0">
          <v-toolbar dense class="indigo darken-1" dark>
            <v-toolbar-title>Picked up Customer Cakes</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-flex style="height: 378px; border: 2px solid grey;" class="scroll-y">
          <v-flex offset-xs0>
            <div v-for="(cake, index) in cakes" :key="index">
              <v-flex v-if="cake.pickedUp == true" xs12 class="cyan darken-1 container2">
                <label style="font-weight: bold; font-size: 30px; line-height: 50px;">
                  {{cake.customerName}}
                </label>
                <label style="float: right">
                </label>
                <br>
                <label style="font-size: 20px; display: block; line-height:40px; font-weight: bold;">
                  Cake: <label style="font-weight: 500;">{{cake.size}} {{cake.cake}}</label>
                </label>
                <label style="font-size: 20px; display: block; line-height:40px; font-weight: bold;">
                  Due: <label style="font-weight: 500;">{{cake.DOW}} {{cake.dueDate}}</label>
                </label>
                <label style="font-weight: bold;">
                  Instructions - <label style="font-weight: 500;">{{cake.message}}</label>
                </label>
                <br>
                <label>
                  <v-btn type="button" class="green" name="pickup" @click="returnDash(cake.customerName)">Return to dash</v-btn>
                </label>
              </v-flex>
              <br>
          </div>
          </v-flex>
        </v-flex>
        </div>
      </v-flex>
  </v-layout>
</v-container>
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
      DOW: '',
      message: '',
      checkedCakes: [],
      checkedSize: [],
      day: '',
      month: '',
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      cake: '',
      cakes: '',
      dueDate: '',
      customerName: '',
      customerBuildName: '',
      cakeMessage: '',
      madeBy: '',
      InitialCake: '',
      pickedUp: ''
    }
  },
  components: {
    PageHeader
  },
  async mounted () {
    this.getLocation()
    this.getCakes()
  },
  methods: {
    async getCakes () {
      this.cakes = (await cakeService.cakeIndex(this.$store.state.token)).data
    },
    async getLocation () {
      this.verification = (await taskService.getLocation(this.$store.state.token)).data
      if (this.verification.error === 'error') {
        this.$router.push({ name: 'login' })
      } else {
        this.location = this.verification.store
      }
    },
    async newCake () {
      if (this.month.toString().length < 2) {
        this.month = '0' + this.month.toString()
      }
      if (this.day.toString().length < 2) {
        this.day = '0' + this.day.toString()
      }
      this.DueDate = this.month.toString() + '/' + this.day.toString()
      await cakeService.newCake({
        customerName: this.CName,
        dueDate: this.DueDate,
        DOW: this.DOW,
        message: this.message,
        cake: this.checkedCakes[0],
        size: this.checkedSize[0],
        store: this.location
      }, this.$store.state.token)
      this.$router.push({ name: 'dashboard' })
    },
    returnDash (cake, makeInitial, updateInitial) {
      this.pickedUp = false
      this.makeCake(cake, this.pickedUp)
    },
    async makeCake (cake, pickedUp) {
      await cakeService.makeCake(this.$store.state.token, {cake: cake, pickedUp: pickedUp})
      this.getCakes()
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
.container2 {
  border: 2px solid black;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  font-size: 20px;
}
</style>
