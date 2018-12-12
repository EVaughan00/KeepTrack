<template>
  <v-container grid-list-xl>
  <v-layout row wrap>
      <v-flex xs12 offset-xs0>
        <div class="white elevation-2">
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>Dashboard</v-toolbar-title>
          </v-toolbar>
        </div>
      </v-flex>
  </v-layout>
    <v-layout v-bind="binding">
      <v-flex>
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Messages</v-toolbar-title>
        </v-toolbar>
      </v-flex>
      <v-flex xs7>
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Tasks</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
              <v-btn
              flat dark @click="navigateTo({ name: 'task-create'})">
                <h1>+</h1>
              </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="white elevation-1">
          <v-flex xs12>
            <div v-for="task in tasks" :key="task.task">
              <img :src="task.taskImageUrl" alt="image"/>
              <label class="label1">{{task.task}}
                  <input type="checkbox">
              </label>
              <br>
              <br>
          </div>
          </v-flex>
      </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import taskService from '@/services/taskService'
export default {
  data () {
    return {
      binding: '',
      tasks: null,
      taskImageUrl: null
    }
  },
  async mounted () {
    this.tasks = (await taskService.taskIndex()).data
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
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

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 1;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}
/
/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.label1 {
  padding-left: 60px;
}
img {
   position: absolute;
   height: 50px;
   width: 50px;
}
</style>
