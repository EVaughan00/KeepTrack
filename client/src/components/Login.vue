<template>
  <v-layout row>
    <PageHeader />
      <v-flex xs4 offset-xs4>
        <div class="white elevation-2">
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>login</v-toolbar-title>
          </v-toolbar>

          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-flex xs12>
              <v-text-field
              label="email"
              type="email"
              name="emai"
              v-model="email"
              ></v-text-field>
            </v-flex>
            <br>
            <v-flex xs12>
              <v-text-field
              label="Password"
              type="password"
              name="password"
              v-model="password"
              ></v-text-field>
            </v-flex>
            <br>
            <div class="danger-alert" v-html="error"/>
            <br>
           <v-btn
           class="cyan"
           dark
           type="button"
           name="submit"
           @click="login"
           >Submit</v-btn>
         </div>
        </div>
      </v-flex>
  </v-layout>

</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'
import PageHeader from '@/components/HeaderOut.vue'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  components: {
    PageHeader
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.error = null
        this.auth = response.data.auth
        var date = new Date()
        var d = date.getDay()
        var DOW
        DOW = this.getDOW(d)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setName', response.data.user.name)
        this.$store.dispatch('setDay', DOW)
        this.$store.dispatch('isManager', response.data.manager)
        if (this.auth) {
          this.$router.push({ name: 'dashboard' })
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    getDOW (d) {
      var DOW
      if (d === 0) {
        DOW = 'Sunday'
      } else if (d === 1) {
        DOW = 'Monday'
      } else if (d === 2) {
        DOW = 'Tuesday'
      } else if (d === 3) {
        DOW = 'Wednesday'
      } else if (d === 4) {
        DOW = 'Thursday'
      } else if (d === 5) {
        DOW = 'Friday'
      } else if (d === 6) {
        DOW = 'Saturday'
      }
      return DOW
    }
  }
}
</script>

<style scoped>
.error{
  color: red
}
.danger-alert {
  color: red;
}
</style>
