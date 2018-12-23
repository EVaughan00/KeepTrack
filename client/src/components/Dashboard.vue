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
        <div style="height: 330px" class="white elevation-0; scroll-y">
          <div v-for="(message, index) in messages" :key="index">
          <label>
            <div class="container1">
              <p>{{message.message}}</p>
              <p>-{{message.user}}</p>
            </div>
          </label>
        </div>
        </div>
        <v-toolbar style="height: 70px;" dense class="cyan accent-4 elevation-0" dark>
          <label>
            <v-text-field
            style="height: 33px; width: 300px;"
            label="Message"
            type="text"
            v-model="message"
            outline
            >
            </v-text-field>
          </label>
          <v-spacer></v-spacer>
        <label style="padding-top: 25px;">
          <v-btn style="height: 50px;" @click="postMessage">Send</v-btn>
        </label>
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
        <div style="max-height: 400px" class="white elevation-1; scroll-y">
          <v-flex xs12>
            <div v-for="task in tasks" :key="task.task">
              <label class="labelImage">
                <img fluid :src="task.taskImageUrl" alt="image"/>
              </label>
              <label class="label1">{{task.task}}
                  <input type="checkbox">
              </label>

              <label class="label2">
                  <v-btn @click="showModal(task.task)">Completed</v-btn>
              </label>
              <br>
              <br>
          </div>
          <modal
            v-bind:task="this.task" v-show="isModalVisible"
            v-on:initial="initial"
            @close="closeModal()"
          />
          </v-flex>
      </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import modal from '@/components/modal.vue'
import taskService from '@/services/taskService'
export default {
  data () {
    return {
      isModalVisible: false,
      binding: '',
      tasks: null,
      taskImageUrl: null,
      task: null,
      User: '',
      messages: '',
      message: ''
    }
  },
  components: {
    modal
  },
  async mounted () {
    this.getTasks()
    this.getMessages()
  },
  methods: {
    async getTasks () {
      this.tasks = (await taskService.taskIndex()).data
    },
    async getMessages () {
      this.messages = (await taskService.getMessage()).data
    },
    navigateTo (route) {
      this.$router.push(route)
    },
    showModal (task) {
      this.task = task
      this.isModalVisible = true
    },
    closeModal () {
      this.removeTask(this.task)
      this.isModalVisible = false
    },
    initial (initial, tasked) {
      console.log(initial + ' Completed ' + tasked)
    },
    async removeTask (task) {
      const response = await taskService.deleteTask({
        task: task
      })
      console.log(response.data.remove)
      this.$router.push({ name: 'dashboard' })
      this.getTasks()
    },
    async postMessage () {
      console.log(this.message)
      await taskService.newMessage({
        message: this.message,
        user: this.$store.state.user.name
      })
      this.getMessages()
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
.label2 {
  float: right;
}
img {
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

/* Darker chat container */
.darker {
  border-color: #ccc;
  background-color: #ddd;
}

</style>
