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
                  <td>__{{this.daily1}}</td>
                </tr>
                <tr>
                  <td>__{{this.daily2}}</td>
                </tr>
                <tr>
                  <td>__{{this.daily3}}</td>
                </tr>
                <tr>
                  <td>__{{this.daily4}}</td>
                </tr>
                <tr>
                  <td>__{{this.daily5}}</td>
                </tr>
                <tr>
                  <td>__{{this.daily6}}</td>
                </tr>
                <tr>
                  <td>
                    __Extra: <input type="text" name="extra1" value="" style="width: 60%;">
                  </td>
                </tr>
                <tr>
                  <td>
                    __Extra: <input type="text" name="extra2" value="" style="width: 60%;">
                  </td>
                </tr>
                <tr>
                  <td>
                    __Extra: <input type="text" name="extra3" value="" style="width: 60%;">
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
import taskService from '@/services/taskService'
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
      numberOfCake: '3',
      daily1: '',
      daily2: '',
      daily3: '',
      daily4: '',
      daily5: '',
      daily6: ''
    }
  },
  methods: {
    async getTemplate () {
      if (this.day === 'Monday') {
        const response = (await taskService.getTemplate(this.$store.state.token)).data
        this.daily1 = response[0].daily1
        this.daily2 = response[0].daily2
        this.daily3 = response[0].daily3
        this.daily4 = response[0].daily4
        this.daily5 = response[0].daily5
        this.daily6 = response[0].daily6
      }
    }
  },
  async mounted () {
    this.day = await this.$store.state.day
    this.getTemplate()
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
