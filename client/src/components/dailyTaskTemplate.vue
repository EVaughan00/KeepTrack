<template>
        <div class="white elevation-0" style="height: 422px;">
          <v-toolbar dense class="green darken-3" dark>
            <v-toolbar-title>Daily Task Sheet</v-toolbar-title>
          </v-toolbar>
          <div v-if="day == 'Monday'">
            <v-layout row wrap>
            <v-flex>
              <table width="100%"  height="129%;">
                <tr>
                  <td>__Inventory</td>
                </tr>
                <tr>
                  <td>__Clean floor tiles</td>
                </tr>
                <tr>
                  <td>__Scrub wall tiles</td>
                </tr>
                <tr>
                  <td>__Menu boards and walls</td>
                </tr>
                <tr>
                  <td>__Assemble ghea</td>
                </tr>
                <tr>
                  <td>__Clean backline</td>
                </tr>
                <tr>
                  <td>
                    __Extra: <input type="text" name="" value="" style="width: 60%;">
                  </td>
                </tr>
                <tr>
                  <td>
                    __Extra: <input type="text" name="" value="" style="width: 60%;">
                  </td>
                </tr>
                <tr>
                  <td>
                    __Extra: <input type="text" name="" value="" style="width: 60%;">
                  </td>
                </tr>
              </table>
            </v-flex>
          </v-layout>
          </div>
          <div v-if="day == 'Tuesday'">
            <h4>Tuesday</h4>
          </div>
          <div v-if="day == 'Wednesday'">
            <h4>Wednesday</h4>
          </div>
          <div v-if="day == 'Thursday'">
            <h4>Thursday</h4>
          </div>
          <div v-if="day == 'Friday'">
            <h4>Friday</h4>
          </div>
          <div v-if="day == 'Saturday'">
            <h4>Saturday</h4>
          </div>
          <div v-if="day == 'Sunday'">
            <h4>Sunday</h4>
          </div>
        </div>
</template>
<script>
export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      error: null,
      response: null,
      exists: '',
      day: '',
      cakeSize: 'L',
      cake: 'Cake Batter',
      numberOfCake: '3'
    }
  },
  methods: {

  },
  async mounted () {
    this.day = await this.$store.state.day
  }
}
</script>

<style scoped>
.error{
  color: red;
}
.danger-alert {
  color: red;
}
table{
  border: 2px solid grey;
}
th{
  font-size: 20px;
  text-align: center;
  max-width: 10px;
}
td{
  font-size: 20px;
  text-align: left;
  max-width: 10px;
  padding-left: 30px;
}

</style>
