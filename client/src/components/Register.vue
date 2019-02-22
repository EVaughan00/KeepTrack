<template>
  <v-layout row>
    <PageHeader />
      <v-flex xs4 offset-xs4>
        <div class="white elevation-2">
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-flex>
              <v-text-field
              label="Name"
              type="text"
              name="name"
              v-model="name"
              ></v-text-field>
            </v-flex>
            <br>
            <v-flex>
              <v-text-field
              label="email"
              type="email"
              name="emai"
              v-model="email"
              ></v-text-field>
            </v-flex>
            <br>
            <v-flex>
              <v-select v-model="location"
              :items="stores"
              label="Store Location"
              ></v-select>
            </v-flex>
            <br>
            <v-flex>
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
           @click="register"
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
  name: 'Register',
  data () {
    return {
      stores: ['Denver West', 'Lakewood', 'Littleton'],
      name: '',
      email: '',
      password: '',
      error: null,
      response: null,
      exists: '',
      selected: '',
      location: ''
    }
  },
  components: {
    PageHeader
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          name: this.name,
          email: this.email,
          password: this.password,
          store: this.location
        })
        this.error = null
        this.exists = response.data.exists
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setName', response.data.user.name)
        if (this.exists) {
          this.$router.push({ name: 'login' })
        } else {
          this.$router.push({ name: 'dashboard' })
        }
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
.danger-alert {
  color: red;
}
</style>
