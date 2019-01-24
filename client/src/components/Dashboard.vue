<template>
  <v-container grid-list-xl>
  <v-layout row wrap>
      <v-flex xs12>
        <div class="white elevation-2">
          <v-toolbar dense class="cyan" dark>
            <v-toolbar-title>Dashboard</v-toolbar-title>
          </v-toolbar>
        </div>
      </v-flex>
  </v-layout>
    <v-layout v-bind="binding">
      <v-flex xs4>
        <v-toolbar dense class="cyan" dark>
          <v-toolbar-title>Message Board</v-toolbar-title>
        </v-toolbar>
        <div style="height: 330px;" class="white elevation-2; scroll-y">
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
            style="height: 33px;"
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
      <v-flex>
        <v-toolbar dense class="cyan" dark>
          <v-toolbar-title>Weekly Tasks</v-toolbar-title>
        </v-toolbar>
        <div style="height: 400px;" class="white elevation-0;">
          <v-flex xs12 style="border: 2px solid grey; height: 400px" class="scroll-y">
            <div class="cont1" v-for="task in tasks" :key="task.task">
              <label class="labelImage">
                <img fluid :src="task.taskImageUrl" alt="image"/>
              </label>
              <label class="label1">
                {{task.task}}
              </label>

              <label class="label2">
                  <v-btn @click="showModal(task.task)">Complete</v-btn>
              </label>
              <br>
              <br>
          </div>
          </v-flex>
      </div>
      </v-flex>
    </v-layout>
  <v-layout>
    <!-- <v-flex xs4>
      <div class="white elevation-0">
        <v-toolbar dense class="cyan" dark>
          <v-toolbar-title>Customer Cakes</v-toolbar-title>
        </v-toolbar>
        <v-flex style="height: 300px;" class="white elevation-0; scroll-y">
        <v-flex offset-xs0>
          <div v-for="cake in cakes" :key="cake.cake">
            <v-flex xs12 class="container2">
              <label style="font-weight: bold;">
                {{cake.customerName}}
              </label>
              <label style="font-size: 20px; float: right;">
                Cake: {{cake.size}} {{cake.cake}}
              </label>
              <br>
              <br>
              <label >
                Due: {{cake.dueDate}}
              </label>
              <br>
              <br>
              <label>
                Instructions - {{cake.message}}
              </label>
            </v-flex>
            <br>
            <br>
        </div>
        </v-flex>
      </v-flex>
      </div>
    </v-flex> -->
    <v-flex>
    <v-layout row>
      <v-flex xs4>
        <pageTemplate/>
      </v-flex>
      <v-flex xs4>
        <div class="white elevation-0">
          <v-toolbar dense class="cyan" dark>
            <v-toolbar-title>Additonal Tasks</v-toolbar-title>
          </v-toolbar>
        <table width="100%" class="tbl1">
          <tr class="tr1">
            <td class="td1">__Clean bathroom</td>
          </tr>
          <tr class="tr1">
            <td class="td1">__Dishes</td>
          </tr>
          <tr class="tr1">
            <td class="td1">__Stock fruits</td>
          </tr>
          <tr class="tr1">
            <td class="td1">__Bleach rags</td>
          </tr>
          <tr class="tr1">
            <td class="td1">__Build Cake:{{this.LCC}} </td>
          </tr>
          <tr class="tr1">
            <td class="td1">__Build Cake:</td>
          </tr>
          <tr class="tr1">
            <td class="td1">__Build Cake:</td>
          </tr>
          <tr class="tr1">
            <td class="td1">__Build Cake: </td>
          </tr>
          <tr class="tr1">
            <td class="td1">__Build Cake: </td>
          </tr>
        </table>
      </div>
      </v-flex>
    <v-flex xs4>
      <div class="white elevation-0">
        <v-toolbar dense class="cyan" dark>
          <v-toolbar-title>Cake Inventory</v-toolbar-title>
        </v-toolbar>
        <table class="table1">
          <tr>
            <th class="th2" style="width: 50%">Cakes</th>
            <th class="th2">SM</th>
            <th class="th2">LG</th>
          </tr>
          <tr>
            <td class="td2">C&C</td>
            <td class="td2">
              <input type="text" name="SC&C" value="" v-model="SCC">
            </td>
            <td class="td2">
              <input type="text" name="LC&C" value="" v-model="LCC">
            </td>
          </tr>
          <tr>
            <td class="td2">Mint</td>
            <td class="td2">
              <input type="text" name="SMint" value="" v-model="SMint">
            </td>
            <td class="td2">
              <input type="text" name="LMint" value="" v-model="LMint">
            </td>
          </tr>
          <tr>
            <td class="td2">CBC</td>
            <td class="td2">
              <input type="text" name="SCBC" value="" v-model="SCBC">
            </td>
            <td class="td2">
              <input type="text" name="LCBC" value="" v-model="LCBC">
            </td>
          </tr>
          <tr>
            <td class="td2">CHIP</td>
            <td class="td2">
              <input type="text" name="SCHIP" value="" v-model="SCHIP">
            </td>
            <td class="td2">
              <input type="text" name="LCHIP" value="" v-model="LCHIP">
            </td>
          </tr>
          <tr>
            <td class="td2">CD</td>
            <td class="td2">
              <input type="text" name="SCD" value="" v-model="SCD">
            </td>
            <td class="td2">
              <input type="text" name="LCD" value="" v-model="LCD">
            </td>
          </tr>
          <tr>
            <td class="td2">COF</td>
            <td class="td2">
              <input type="text" name="SCOF" value="" v-model="SCOF">
            </td>
            <td class="td2">
              <input type="text" name="LCOF" value="" v-model="LCOF">
            </td>
          </tr>
          <tr>
            <td class="td2">SP</td>
            <td class="td2">
              <input type="text" name="SSP" value="" v-model="SSP">
            </td>
            <td class="td2">
              <input type="text" name="LSP" value="" v-model="LSP">
            </td>
          </tr>
          <tr>
            <td class="td2">CND</td>
            <td class="td2">
              <input type="text" name="SCND" value="" v-model="SCND">
            </td>
            <td class="td2">
              <input type="text" name="LCND" value="" v-model="LCND">
            </td>
          </tr>
          <tr>
            <td class="td2">PBP</td>
            <td class="td2">
              <input type="text" name="SPBP" value="" v-model="SPBP">
            </td>
            <td class="td2">
              <input type="text" name="LPBP" value="" v-model="LPBP">
            </td>
          </tr>
          <tr>
            <td class="td2">MD</td>
            <td class="td2">
              <input type="text" name="SMD" value="" v-model="SMD">
            </td>
            <td class="td2">
              <input type="text" name="LMD" value="" v-model="LMD">
            </td>
          </tr>
          <tr>
            <td class="td2">TDD</td>
            <td>
              <input type="text" name="STDD" value="" v-model="STDD">
            </td>
            <td class="td2">
              <input type="text" name="LTDD" value="" v-model="LTDD">
            </td>
          </tr>
        </table>
      </div>
    </v-flex>
  </v-layout>
</v-flex>

    <!-- <v-flex xs4>
      <div class="white elevation-0">
        <v-toolbar dense class="cyan" dark>
          <v-toolbar-title>Ice Inventory</v-toolbar-title>
        </v-toolbar>
        <v-flex offset-xs0>
          <h3>Ice Cream Management coming soon!</h3>
        </v-flex>
      </div>
    </v-flex> -->
  </v-layout>
  <modal
    v-bind:task="this.task" v-show="isModalVisible"
    v-on:initial="initial"
    @close="closeModal()"
  />
  </v-container>
</template>

<script>
import modal from '@/components/modal.vue'
import taskService from '@/services/taskService'
import cakeService from '@/services/cakeService'
import io from 'socket.io-client'
import pageTemplate from '@/components/dailyTaskTemplate.vue'
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
      message: '',
      socket: io('localhost:8081'),
      text: 'Message',
      Initial: '',
      cakes: null,
      cake: '',
      dueDate: '',
      customerName: '',
      cakeMessage: '',
      LCC: '',
      SCC: '',
      SMint: '',
      LMint: '',
      SCBC: '',
      LCBC: '',
      SCHIP: '',
      LCHIP: '',
      SCD: '',
      LCD: '',
      SCOF: '',
      LCOF: '',
      SSP: '',
      LSP: '',
      SCND: '',
      LCND: '',
      SPBP: '',
      LPBP: '',
      SMD: '',
      LMD: '',
      STDD: '',
      LTDD: ''
    }
  },
  components: {
    modal,
    pageTemplate
  },
  async mounted () {
    this.getTasks()
    this.getMessages()
    this.getLiveMessages()
    this.getCakes()
    this.verifyUser()
  },
  methods: {
    verifyUser () {
      if (this.$store.state.token === 'null') {
        this.$router.push({name: 'login'})
      }
    },
    async getTasks () {
      this.tasks = (await taskService.taskIndex()).data
    },
    async getMessages () {
      this.messages = (await taskService.getMessage()).data
    },
    getLiveMessages () {
      this.socket.on('MESSAGE', (data) => {
        this.messages = [...this.messages, data]
      // you can also do this.messages.push(data)
      })
    },
    async getCakes () {
      this.cakes = (await cakeService.cakeIndex()).data
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
      this.Initial = initial
    },
    async removeTask (task) {
      console.log('Initial is ' + this.Initial)
      const response = await taskService.deleteTask({
        task: task
      }, {initial: this.Initial})
      console.log(response.data.message)
      this.$router.push({ name: 'dashboard' })
      this.getTasks()
    },
    async postMessage (e) {
      e.preventDefault()
      this.socket.emit('SEND_MESSAGE', {
        user: this.$store.state.name,
        message: this.message
      })
      if (this.message !== '') {
        console.log(this.message)
        await taskService.newMessage({
          message: this.message,
          user: this.$store.state.name
        })
      }
      this.message = ''
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
input{
  width: 100%;
}
.label1 {
  padding-left: 20px;
  font-size: 20px;
}
.label2 {
  margin-top: 1.3vh;
  float: right;
}
img {
   float: left;
   height: 40px;
   width: 40px;
   margin-top: 1.5vh;
}
.container1 {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  font-size: 15px;
}
.container2 {
  border: 2px solid black;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  font-size: 20px;
}
.table1 {
  width: 100%;
  height: 59%;
  border-collapse: collapse;
  border: 2px solid grey;
  margin-bottom: 10px;
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
.td2, .th2 {
  border: 1px solid grey;
  font-size: 20px;
  text-align: left;
}
.td1{
  font-size: 20px;
  text-align: left;
  max-width: 10px;
  padding-left: 30px;
}
.tbl1{
  border: 2px solid grey;
  height: 378px;
}
</style>
