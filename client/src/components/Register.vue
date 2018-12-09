<template>
  <v-layout column>
      <v-flex xs6 offset-xs3>
        <div class="white elevation-2">
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>

          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-flex xs12 sm6 md3>
              <v-text-field
              label="email"
              type="email"
              name="emai"
              v-model="email"
              ></v-text-field>
            </v-flex>
            <br>
            <v-flex xs12 sm6 md3>
              <v-text-field
              label="Password"
              type="password"
              name="password"
              v-model="password"
              ></v-text-field>
            </v-flex>
            <br>
            <div class="error" v-html="error"/>
            <br>
           <v-btn
           class="cyan"
           dark
           type="button"
           name="submit"
           @click="register"
           >Submit</v-btn>
         </div>
        </div>
      </v-flex>
  </v-layout>

</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.error = null
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.error{
  color: red;

}
</style>
