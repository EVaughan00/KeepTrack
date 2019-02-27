<template>
  <v-layout row wrap>
    <PageHeader />
      <v-flex xs4 offset-xs4>
        <div class="white elevation-2">
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>Create Template</v-toolbar-title>
          </v-toolbar>
        </div>
        <v-flex xs12>
        <div>
          <v-select v-model="DOW"
          :items="days"
          label="Day of week"
          ></v-select>
          <v-text-field
          label="Daily Task #1"
          v-model="daily1"
          ></v-text-field>
          <v-text-field
          label="Daily Task #2"
          v-model="daily2"
          ></v-text-field>
          <v-text-field
          label="Daily Task #3"
          v-model="daily3"
          ></v-text-field>
          <v-text-field
          label="Daily Task #4"
          v-model="daily4"
          ></v-text-field>
          <v-text-field
          label="Daily Task #5"
          v-model="daily5"
          ></v-text-field>
          <v-text-field
          label="Daily Task #6"
          v-model="daily6"
          ></v-text-field>
          <v-btn
          class="cyan"
          dark
          type="button"
          name="submit"
          @click="newTemplate"
          >Submit</v-btn>
        </div>
      </v-flex>
      </v-flex>
  </v-layout>
</template>

<script>
import taskService from '@/services/taskService'
import PageHeader from '@/components/Header.vue'
export default {
  data () {
    return {
      DOW: '',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      daily1: '',
      daily2: '',
      daily3: '',
      daily4: '',
      daily5: '',
      daily6: '',
      verification: '',
      location: ''
    }
  },
  components: {
    PageHeader
  },
  async mounted () {
    this.getLocation()
  },
  methods: {
    async getLocation () {
      this.verification = (await taskService.getLocation(this.$store.state.token)).data
      if (this.verification.error === 'error') {
        this.$router.push({ name: 'login' })
      } else {
        this.location = this.verification.store
      }
    },
    async newTemplate () {
      console.log('Making new template for ' + this.DOW)
      const response = (await taskService.newTemplate({
        day: this.DOW,
        daily1: this.daily1,
        daily2: this.daily2,
        daily3: this.daily3,
        daily4: this.daily4,
        daily5: this.daily5,
        daily6: this.daily6,
        extra1: 'Extra:',
        extra2: 'Extra:',
        extra3: 'Extra:',
        store: this.location
      }, this.$store.state.token))
      console.log(response)
      this.$router.push({ name: 'manage' })
    }
  }
}
</script>

<style scoped>

</style>
