<template>
  <div class="hello">
    <PageHeader />
    <h1>{{ msg }}</h1>
    <br>
    <h3>Please login or create an account to Continue</h3>
  </div>
</template>

<script>
import PageHeader from '@/components/HeaderOut.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Evan\'s KeepTrack app'
    }
  },
  components: {
    PageHeader
  },
  async mounted () {
    const response = await this.$store.state.isUserLoggedIn
    if (response !== 'false') {
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
