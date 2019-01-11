<template>
  <v-form>
    <v-container>
      <v-flex xs12 offset-xs0>
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Paperwork</v-toolbar-title>
        </v-toolbar>
      </v-flex>
      <br>
      <v-layout row>
      <v-flex xs8>
      <v-flex xs12>
        <v-layout row wrap>
                <v-flex xs12>
                  <v-toolbar flat dense class="cyan" dark>
                    <v-toolbar-title>Drawer</v-toolbar-title>
                  </v-toolbar>
                  <br>
                </v-flex>
                <v-flex xs12 sm6 md4 offset-xs1>
                  <v-text-field
                    label="Total Cash in Drawer*"
                    outline
                    v-model="cash"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md4 sm6 offset-xs2>
                  <v-text-field
                    label="Morning Drop* (If Any)"
                    outline
                    v-model="cashMorning"
                  ></v-text-field>
                </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12>
      <v-layout row wrap>
          <v-flex xs12>
            <v-toolbar flat dense class="cyan" dark>
              <v-toolbar-title>POS</v-toolbar-title>
            </v-toolbar>
            <br>
          </v-flex>
            <v-flex xs12 sm6 md4 offset-xs1>
              <v-text-field
                label="Total Sales*"
                outline
                v-model="total"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md4 sm6 offset-xs2>
              <v-text-field
                label="Credit Card Totals*"
                outline
                v-model="CC"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4 offset-xs1>
              <v-text-field
                label="Redeemed Gift Cards*"
                outline
                v-model="subGift"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md4 sm6 offset-xs2>
              <v-text-field
                label="Activated/Reloaded Gift Cards* (If Any)"
                outline
                v-model="addGift"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4 offset-xs1>
              <v-text-field
                label="Paid Outs* (If Any)"
                outline
                v-model="paidOut"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md4 sm6 offset-xs2>
              <v-text-field
                label="Additional* (Use + or -)"
                outline
                v-model="additional"
              ></v-text-field>
            </v-flex>
      </v-layout>
      <v-btn
      class="cyan"
      dark
      type="button"
      name="submit"
      @click="calculate"
      >Submit</v-btn>
    </v-flex>
  </v-flex>
    <v-flex xs4>
    <v-flex>
      <v-layout column>
        <v-flex>
          <label>
          <v-textarea
          style="height: 155px;"
            label="Notes"
            v-model="notes"
            outline
          ></v-textarea>
        </label>
        </v-flex>
        <v-flex>
            <label>
              <div class="container1; white elevation-0" style="width: 370px; height: 300px;">
                <v-toolbar flat dense class="cyan" dark>
                  <v-toolbar-title>Paperwork Totals</v-toolbar-title>
                </v-toolbar>
                <br>
                <br>
                <br>
                <p style="font-size: 20px;">{{this.diff}}</p>
                <p style="font-size: 20px;">{{this.drawer}}</p>
              </div>
            </label>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-flex>
</v-layout>
    </v-container>
  </v-form>
</template>

<script>
import cakeService from '@/services/cakeService'
export default {
  data () {
    return {
      notes: null,
      cash: 0,
      cashMorning: 0,
      total: 0,
      CC: 0,
      subGift: 0,
      addGift: 0,
      paidOut: 0,
      subtracted: 150,
      additional: 0,
      calculated: 0,
      drawer: 'Your drop is: $0',
      diff: 'You are short: $0'
    }
  },
  components: {

  },
  methods: {
    calculate () {
      var drawerDrop = this.calculateDrawer()
      var POSCount = this.calculatePOS()
      var diff1 = Math.abs(parseFloat(POSCount) - parseFloat(drawerDrop)).toFixed(2)
      console.log(diff1)
      if (drawerDrop < 0) {
        this.drawer = 'You have less than $150 in the drawer. You don\'t have a drop!'
      } else {
        this.drawer = 'Your drop is $' + drawerDrop
      }
      if (POSCount > drawerDrop) {
        this.diff = 'You are short $' + diff1
      } else if (parseFloat(diff1) === 0.00) {
        this.diff = 'You are right on!'
      } else {
        this.diff = 'You are over $' + diff1
      }
    },
    calculateDrawer () {
      return (this.cash - 150).toFixed(2)
    },
    calculatePOS () {
      return (parseFloat(this.total) + parseFloat(this.additional) + parseFloat(this.addGift) - parseFloat(this.CC) - parseFloat(this.cashMorning) - parseFloat(this.subGift) - parseFloat(this.paidOut)).toFixed(2)
    },
    async newPaper () {
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

</style>
