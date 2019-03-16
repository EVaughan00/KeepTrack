<template>
  <v-layout row>
    <PageHeader />
    <v-flex xs4 offset-xs4 class="white elevation-1">
      <v-toolbar flat dense class="cyan darken-2" dark>
        <v-toolbar-title>Cash Drop</v-toolbar-title>
      </v-toolbar>
      <br>
      <br>
      <v-flex xs10 offset-xs1>
        <v-text-field
        label="Name*"
        type="text"
        name="name"
        outline
        v-model="name"
        ></v-text-field>
        <v-text-field
        label="Please enter your drop here*"
        type="text"
        name="name"
        outline
        v-model="drop"
        ></v-text-field>
        <v-textarea
        style="height: 155px;"
          label="Add additional notes here*"
          v-model="notes"
          outline
        ></v-textarea>
        <label style="color: red;">{{this.error}}</label>
        <br>
        <v-btn color="cyan darken-2" @click="newDrop">Submit</v-btn>
        <br>
        <br>
      </v-flex>
    </v-flex>
  </v-layout>
</template>
<script>
// import AuthenticationService from '@/services/AuthenticationService'
import PageHeader from '@/components/Header.vue'
import PaperworkService from '@/services/paperworkService'
export default {
  name: 'cashdrop',
  data () {
    return {
      drop: '0.00',
      error: '',
      name: '',
      notes: ''
    }
  },
  components: {
    PageHeader
  },
  methods: {
    async newDrop () {
      if (this.name === '' || this.name === null) {
        this.error = 'Please enter your name'
      } else {
        if (this.drop !== null && this.drop !== '') {
          if (isNaN(this.drop)) {
            this.error = 'Please enter a valid cash drop (Ex: 150.00)'
          } else {
            if ((parseFloat(this.drop).toFixed(2) - this.drop) !== 0.00) {
              this.error = 'Please enter two decimal places'
            } else {
              // this.drop = (parseFloat(this.drop) - 150).toFixed(2)
              var d = new Date()
              var Month = d.getMonth() + 1
              var Day = d.getDate() + 1 // add one because paperwork will be submitted a day ahead.
              if (Month < 10) {
                Month = '0' + Month.toString()
              }
              if (Day.toString().length < 2) {
                Day = '0' + Day.toString()
              }
              var date = Month + '/' + Day + '/' + (d.getYear() - 100).toString()
              await PaperworkService.newDrop({
                drop: this.drop,
                date: date,
                name: this.name,
                notes: this.notes
              }, this.$store.state.token)
              this.$router.push({ name: 'dashboard' })
            }
          }
        } else {
          this.error = 'Please enter a value before submitting'
        }
      }
    }
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
</style>
