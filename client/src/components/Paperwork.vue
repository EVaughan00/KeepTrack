<template>
  <v-form>
    <v-container>
      <v-flex xs12>
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Paperwork</v-toolbar-title>
        </v-toolbar>
      </v-flex>
      <br>
      <v-layout row>
      <v-flex xs7>
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
      >Calculate Drop</v-btn>
    </v-flex>
  </v-flex>
  <v-flex>
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
              <div class="container1; white elevation-0" style="height: 300px;">
                <v-toolbar flat dense class="cyan" dark>
                  <v-toolbar-title>Paperwork Info</v-toolbar-title>
                </v-toolbar>
                <table class="table1">
                  <tr>
                    <td>
                      Name: <input style="position: absolute; width: 9%; margin-left: 8px;" type="text" name="name" v-model="name">
                    </td>
                    <td>
                      Date: <input style="position: absolute; width: 9.7%; margin-left: 8px;" type="text" name="name" v-model="date">
                    </td>
                  </tr>
                  <tr>
                    <td>Total Sales: $<label class="labelPaper">{{this.total}}</label></td>
                    <td>Credit Cards: $<label class="labelPaper">{{this.CC}}</label></td>
                  </tr>
                  <tr>
                    <td>Redeemed: $<label class="labelPaper">{{this.subGift}}</label></td>
                    <td>Active/Reload: $<label class="labelPaper">{{this.addGift}}</label></td>
                  </tr>
                  <tr>
                    <td>Paid Out: $<label class="labelPaper">{{this.paidOut}}</label></td>
                    <td>Additional(+/-): $<label class="labelPaper">{{Math.abs(this.additional)}}</label></td>
                  </tr>
                </table>
                <h2>Calculated</h2>
                <table class="table2">
                  <tr>
                    <td>{{this.drawer}}</td>
                    <td>{{this.diff}}</td>
                  </tr>
                </table>
              </div>
              <br>
              <v-btn
              class="cyan"
              dark
              type="button"
              name="submit"
              @click="newPaper"
              >Submit</v-btn>
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
import paperworkService from '@/services/paperworkService'
export default {
  data () {
    return {
      name: '',
      date: '',
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
      addSub: '',
      drawer: 'Drop: $0',
      diff: 'Short: $0',
      short: '',
      drop: ''
    }
  },
  components: {

  },
  methods: {
    calculate () {
      var drawerDrop = this.calculateDrawer()
      this.drop = drawerDrop
      var POSCount = this.calculatePOS()
      var diff1 = Math.abs(parseFloat(POSCount) - parseFloat(drawerDrop)).toFixed(2)
      this.short = diff1
      console.log(diff1)
      if (drawerDrop < 0) {
        this.drawer = 'You have less than $150 in the drawer. You don\'t have a drop!'
      } else {
        this.drawer = 'Drop $' + drawerDrop
      }
      if (POSCount > drawerDrop) {
        this.diff = 'Short $' + diff1
      } else if (parseFloat(diff1) === 0.00) {
        this.diff = 'Right on!'
      } else {
        this.diff = 'Over $' + diff1
      }
    },
    calculateDrawer () {
      return (this.cash - 150).toFixed(2)
    },
    calculatePOS () {
      return (parseFloat(this.total) + parseFloat(this.additional) + parseFloat(this.addGift) - parseFloat(this.CC) - parseFloat(this.cashMorning) - parseFloat(this.subGift) - parseFloat(this.paidOut)).toFixed(2)
    },
    async newPaper () {
      console.log(this.subGift)
      console.log(this.addGift)
      const response = await paperworkService.newPaper({
        name: this.name,
        date: this.date,
        notes: this.notes,
        total: this.total,
        cash: this.cash,
        redeemed: this.subGift,
        activated: this.addGift,
        short: this.short,
        drop: this.drop
      })
      console.log(response.data.message)
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>

<style scoped>
.paperworkContainer{
  border: solid grey;
  border-width: .5px 1px .5px 1px;
  font-size: 20px;
}
.paperworkLabel2{
  font-size: 20px;
  float: right;
  margin-right: 40px;
}
.labelPaper{
  position: absolute;
  width: 4%;
  overflow: hidden;
}
.table1 {
  width: 100%;
  height: 59%;
  border-collapse: collapse;
  border: 1px solid black;
  margin-bottom: 10px;
}
.table2{
  width: 100%;
  border-collapse: collapse;
  border: 1px solid black;
}
th, td {
  border: 1px solid grey;
  font-size: 20px;
  text-align: left;
  max-width: 10px;
}
</style>
