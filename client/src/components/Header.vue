<template>
  <v-toolbar fixed class="cyan darken-2" dark>
    <v-toolbar-title class="mr-4">
      <span
      class="home"
        @click="navigateTo({ name: 'root'})">
        KeepTrack
      </span>
    </v-toolbar-title>
    <v-toolbar-items>
        <v-btn
        flat dark @click="navigateTo({ name: 'dashboard'})">
          Dashboard
        </v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="this.$store.state.isManager == 'true'">
        <v-btn
        flat dark @click="navigateTo({ name: 'manage'})">
          Manage Tasks
        </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
        <v-btn
         flat dark @click="navigateTo({ name: 'cakeform'})">
          Cakes
        </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
        <v-btn
         flat dark @click="navigateTo({ name: 'cashdrop'})">
        Paperwork
        </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
        <v-btn
        flat dark @click="logout">
          Logout
        </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setName', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
</style>
