<template>
  <v-toolbar fixed class="cyan darken-2" dark>
    <v-toolbar-title class="mr-4">
      <span
      class="home"
        @click="navigateTo({ name: 'root'})">
        KeepTrack
      </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
        <v-btn
        flat dark @click="navigateTo({ name: 'login'})">
          Login
        </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
        <v-btn
        flat dark @click="navigateTo({ name: 'register'})">
          Sign Up
        </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
</style>
