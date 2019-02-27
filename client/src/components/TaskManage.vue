<template>
  <v-container grid-list-xl>
  <PageHeader />
  <v-layout row wrap>
      <v-flex xs12 offset-xs0>
        <div class="white elevation-2">
          <v-toolbar dense class="cyan" dark>
            <v-toolbar-title>Task Management</v-toolbar-title>
          </v-toolbar>
        </div>
      </v-flex>
  </v-layout>
    <v-layout row wrap>
      <v-flex>
      </v-flex>
      <v-flex xs12 offset-xs0>
        <v-toolbar dense class="pink darken-4" dark>
          <v-toolbar-title>Completed Weekly Tasks</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
              <v-btn fab dark color="light-green" @click="navigateTo({ name: 'task-create'})">
                <v-icon dark>add</v-icon>
              </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div style="border: 2px solid grey;">
        <div class="white elevation-2; scroll-y" style="height: 300px;">
          <v-flex>
            <div class="cont1" v-for="task in tasks" :key="task.task">
              <label class="labelImage">
                <img fluid :src="task.taskImageUrl" alt="image"/>
              </label>
              <label class="label1">{{task.task}}
              </label>
              <label class="label3">
                  <v-btn @click="addTask(task.task)">ADD to dash</v-btn>
              </label>
              <label class="label3">
                  <v-btn color="red" @click="removeTask(task.task)">Delete</v-btn>
              </label>
              <label class="label2">Last completed by {{task.initial}}
              </label>
              <br>
              <br>
            </div>
          </v-flex>
        </div>
      </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
        <v-flex xs6 offset-xs0>
            <v-toolbar dense class="green darken-3" dark>
              <v-toolbar-title>Daily Task Templates</v-toolbar-title>
            </v-toolbar>
            <div style="border: 2px solid grey;">
            <v-flex class="white elevation-0">
              <div class="cont1" v-for="(weekday, index) in weekdays" :key="index" style="height: 50px;">
                <label v-if="day == weekdays[index]" class="highlight">{{weekdays[index]}}
                </label>
                <label v-if="day != weekdays[index]" class="label1">{{weekdays[index]}}
                </label>
                <label class="label3">
                    <v-btn style="height: 28px;" @click="setTemp(weekdays[index])">Modify</v-btn>
                </label>
              </div>
            </v-flex>
          </div>
        </v-flex>
        <v-flex xs6 offset-xs0>
            <v-toolbar dense class="green darken-3" dark>
              <v-toolbar-title>Modifying {{this.day}} Template</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                  <v-btn style="height: 34px" type="button" dark color="light green" @click="updateSheet">
                    Update
                  </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <div style="height: 504px;">
              <TaskTemplate class="white elevation-0" style="height: 77%;"/>
            </div>
        </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import TaskTemplate from '@/components/dailyTaskTemplateMod'
import taskService from '@/services/taskService'
import PageHeader from '@/components/Header.vue'
export default {
  data () {
    return {
      binding: '',
      day: '',
      tasks: null,
      taskImageUrl: null,
      task: null,
      Initial: '',
      verification: '',
      location: '',
      weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  },
  components: {
    PageHeader,
    TaskTemplate
  },
  async mounted () {
    this.getLocation()
    this.day = this.$store.state.daySelect
  },
  methods: {
    async getLocation () {
      this.verification = (await taskService.getLocation(this.$store.state.token)).data
      if (this.verification.error === 'error') {
        this.$router.push({ name: 'login' })
      } else {
        this.location = this.verification.store
        this.getTasks()
      }
    },
    async getTasks () {
      this.tasks = (await taskService.taskIndexCompleted(this.$store.state.token)).data
    },
    async addTask (task) {
      await taskService.AddTaskToDash({
        task: task
      }, this.$store.state.token)
      this.$router.push({ name: 'manage' })
      this.getTasks()
    },
    async removeTask (task) {
      await taskService.removeTask({
        task: task
      }, this.$store.state.token)
      this.$router.push({ name: 'manage' })
      this.getTasks()
    },
    navigateTo (route) {
      this.$router.push(route)
    },
    setTemp (weekday) {
      this.$store.dispatch('setDaySelect', weekday)
      this.$root.$emit('refreshSheet')
      this.day = this.$store.state.daySelect
    },
    updateSheet () {
      this.$root.$emit('updateSheet')
    }
  }
}
</script>

<style scoped>
.container {
  text-align: left;
  display: block;
  position: relative;
  padding-left: 20px;
  margin-bottom: 13px;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.label1 {
  margin-left: 20px;
  font-size: 20px;
  position: relative;
}
.label3 {
  margin-top: 1vh;
  float: right;
}
.label2 {
  margin-top: 1.3vh;
  float: right;
  padding-right: 120px;
}

img {
   margin-top: 1vh;
   float: left;
   height: 50px;
   width: 50px;
}

.container1 {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  font-size: 15px;
}
.cont1{
  border: solid grey;
  border-width: 0px 0px 1px 0px;
}
/* Darker chat container */
.darker {
  border-color: #ccc;
  background-color: #ddd;
}
.highlight{
  margin-left: 20px;
  font-size: 20px;
  position: relative;
  color: red;
}
</style>
