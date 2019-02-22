<template>
  <v-layout row wrap>
    <PageHeader />
      <v-flex xs6 offset-xs3>
        <div class="white elevation-2">
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>Create Task</v-toolbar-title>
          </v-toolbar>
        </div>
        <v-flex xs12>
        <div>
          <v-text-field
          label="task"
          v-model="task"
          ></v-text-field>
          <v-text-field
          label="Task Image URL"
          v-model="taskImageUrl"
          ></v-text-field>
          <v-btn
          class="cyan"
          dark
          type="button"
          name="submit"
          @click="newTask"
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
      task: null,
      taskImageUrl: null,
      completed: 'false',
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
    async newTask () {
      const response = await taskService.newTask({
        task: this.task,
        taskImageUrl: this.taskImageUrl,
        completed: this.completed
      }, this.$store.state.token)
      console.log(response)
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>

<style scoped>

</style>
