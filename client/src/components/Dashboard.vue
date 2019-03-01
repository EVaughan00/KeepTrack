<template>
  <v-container grid-list-xl>
    <page-header />
  <v-layout row wrap>
      <v-flex xs12>
        <div class="white elevation-2">
          <v-toolbar dense class="cyan darken-2" dark>
            <v-toolbar-title>Dashboard</v-toolbar-title>
          </v-toolbar>
        </div>
      </v-flex>
  </v-layout>
    <v-layout v-bind="binding">
      <v-flex xs4>
        <v-toolbar dense class="teal" dark>
          <v-toolbar-title>Message Board</v-toolbar-title>
        </v-toolbar>
        <div style="height: 330px;" class="messageBoard scroll-y">
          <div v-for="(message, index) in messages" :key="index">
          <label>
            <div class="container1">
              <p>{{message.message}}</p>
              <p>-{{message.user}}</p>
            </div>
          </label>
          </div>
        </div>
        <v-toolbar style="height: 70px;" dense class="teal elevation-0;" dark>
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
        <v-toolbar dense class="pink darken-4" dark>
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
    <v-flex>
    <v-layout row>
      <v-flex xs7>
          <div class="white elevation-0">
            <v-toolbar dense class="indigo darken-1" dark>
              <v-toolbar-title>Customer Cakes</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                  <!-- <v-btn
                  flat dark @click="sortCakeByDate">
                    Update
                  </v-btn> -->
              </v-toolbar-items>
            </v-toolbar>
            <v-flex style="height: 378px; border: 2px solid grey;" class="scroll-y">
            <v-flex offset-xs0>
              <div v-for="cake in cakes" :key="cake.customerName">
                <v-flex v-if="cake.cakeColor == 'red' && cake.pickedUp != true" xs12 class="cyan darken container2">
                  <label style="font-weight: bold; line-height: 50px">
                    {{cake.customerName}}
                  </label>
                  <label style="float: right">
                    <v-btn v-if="cake.madeBy == '' || cake.madeBy == null" type="button" class="red" name="make" @click="showCakeModal(cake.customerName)">Make</v-btn>
                    <label style="color: red; font-weight: bold;" v-if="cake.madeBy != '' && cake.madeBy != null">Made by {{cake.madeBy}}</label>
                    <v-btn v-if="(cake.decoratedBy == '' || cake.decoratedBy == null) && (cake.madeBy != '' && cake.madeBy != null)" type="button" class="blue" name="make" @click="showUpdateCakeModal(cake.customerName, cake.madeBy)">Decorate</v-btn>
                    <v-btn v-if="cake.madeBy == '' || cake.madeBy == null" type="button" class="blue" name="make" @click="decorateAlert()">Decorate</v-btn>
                    <label style="color: blue; font-weight: bold;" v-if="cake.decoratedBy != '' && cake.decoratedBy != null">Decorated by {{cake.decoratedBy}}</label>
                    <v-btn v-if="cake.decoratedBy != '' && cake.decoratedBy != null" type="button" class="green" name="pickup" @click="pickUpCake(cake.customerName, cake.madeBy, cake.decoratedBy)">Picked Up</v-btn>
                    <v-btn v-if="cake.decoratedBy == '' || cake.decoratedBy == null" type="button" class="green" name="pickup" @click="pickedUpAlert()">Picked Up</v-btn>
                  </label>
                  <br>
                  <label style="font-size: 20px; display: block; line-height:40px; font-weight: bold;">
                    Cake: <label style="font-weight: 500;">{{cake.size}} {{cake.cake}}</label>
                  </label>
                  <label style="font-size: 20px; display: block; line-height:40px; font-weight: bold;">
                    Due: <label style="font-weight: 500;">{{cake.DOW}} {{cake.dueDate}}</label>
                  </label>
                  <label style="font-weight: bold;">
                    Instructions - <label style="font-weight: 500;">{{cake.message}}</label>
                  </label>
                </v-flex>
                <v-flex v-if="cake.cakeColor == 'blue'" xs12 class="cyan darken-3 container2">
                  <label style="font-weight: bold;">
                    {{cake.customerName}}
                  </label>
                  <label style="float: right">
                    <v-btn v-if="cake.madeBy == '' || cake.madeBy == null" type="button" class="red" name="make" @click="showCakeModal(cake.customerName)">Make</v-btn>
                    <label style="color: red; font-weight: bold;" v-if="cake.madeBy != '' && cake.madeBy != null">Made by {{cake.madeBy}}</label>
                    <v-btn v-if="(cake.decoratedBy == '' || cake.decoratedBy == null) && (cake.madeBy != '' && cake.madeBy != null)" type="button" class="blue" name="make" @click="showUpdateCakeModal(cake.customerName, cake.madeBy)">Decorate</v-btn>
                    <v-btn v-if="cake.madeBy == '' || cake.madeBy == null" type="button" class="blue" name="make" @click="decorateAlert()">Decorate</v-btn>
                    <label style="color: blue; font-weight: bold;" v-if="cake.decoratedBy != '' && cake.decoratedBy != null">Decorated by {{cake.decoratedBy}}</label>
                    <v-btn v-if="cake.decoratedBy == '' || this.decoratedBy == null" type="button" class="green" name="pickup">Picked Up</v-btn>
                    <v-btn v-if="cake.decoratedBy != '' && this.decoratedBy != null" type="button" class="green" name="pickup" @click="pickedUpAlert()">Picked Up</v-btn>
                  </label>
                  <br>
                  <label style="font-size: 20px; display: block; line-height:40px; font-weight: bold;">
                    Cake: <label style="font-weight: 500;">{{cake.size}} {{cake.cake}}</label>
                  </label>
                  <label style="font-size: 20px; display: block; line-height:40px; font-weight: bold;">
                    Due: <label style="font-weight: 500;">{{cake.DOW}} {{cake.dueDate}}</label>
                  </label>
                  <label style="font-weight: bold;">
                    Instructions - <label style="font-weight: 500;">{{cake.message}}</label>
                  </label>
                </v-flex>
                <v-flex v-if="cake.cakeColor == 'orange'" xs12 class="cyan darken-2 container2">
                  <label style="font-weight: bold;">
                    {{cake.customerName}}
                  </label>
                  <label style="float: right">
                    <v-btn v-if="cake.madeBy == '' || cake.madeBy == null" type="button" class="red" name="make" @click="showCakeModal(cake.customerName)">Make</v-btn>
                    <label style="color: red; font-weight: bold;" v-if="cake.madeBy != '' && cake.madeBy != null">Made by {{cake.madeBy}}</label>
                    <v-btn v-if="(cake.decoratedBy == '' || cake.decoratedBy == null) && (cake.madeBy != '' && cake.madeBy != null)" type="button" class="blue" name="make" @click="showUpdateCakeModal(cake.customerName, cake.madeBy)">Decorate</v-btn>
                    <v-btn v-if="cake.madeBy == '' || cake.madeBy == null" type="button" class="blue" name="make" @click="decorateAlert()">Decorate</v-btn>
                    <label style="color: blue; font-weight: bold;" v-if="cake.decoratedBy != '' && cake.decoratedBy != null">Decorated by {{cake.decoratedBy}}</label>
                    <v-btn  v-if="cake.pickedUp == null" type="button" class="green" name="pickup">Picked Up</v-btn>
                  </label>
                  <br>
                  <label style="font-size: 20px; display: block; line-height:40px; font-weight: bold;">
                    Cake: <label style="font-weight: 500;">{{cake.size}} {{cake.cake}}</label>
                  </label>
                  <label style="font-size: 20px; display: block; line-height:40px; font-weight: bold;">
                    Due: <label style="font-weight: 500;">{{cake.DOW}} {{cake.dueDate}}</label>
                  </label>
                  <label style="font-weight: bold;">
                    Instructions - <label style="font-weight: 500;">{{cake.message}}</label>
                  </label>
                </v-flex>
                <br>
            </div>
            </v-flex>
          </v-flex>
          </div>
        </v-flex>
    <v-flex xs5>
      <v-toolbar dense class="green darken-3" dark>
        <v-toolbar-title>Daily Task Sheet</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn dark color="light green" type="button" @click="updateTemplate">update</v-btn>
      </v-toolbar>
    <pageTemplate style="height: 91%;">
    </pageTemplate>
    </v-flex>
  </v-layout>
</v-flex>

  </v-layout>
  <modal1
    v-bind:task="this.task" v-show="isModalVisible"
    v-on:initial="initial"
    @close="closeModal()"
  />
  <modal2
    v-bind:customerName="this.customerBuildName" v-show="isCakeModalVisible"
    v-on:initial="initialCake"
    @close="closeCakeModal()"
  />
  <updateCake
    v-bind:customerName="this.customerBuildName" v-show="isUpdateCakeModalVisible"
    v-on:initial="initialUpdateCake"
    @close="closeUpdateCakeModal()"
  />
  </v-container>
</template>

<script>
import modal1 from '@/components/modal1.vue'
import modal2 from '@/components/modal2.vue'
import updateCake from '@/components/updateCake.vue'
import taskService from '@/services/taskService'
import cakeService from '@/services/cakeService'
import io from 'socket.io-client'
import pageTemplate from '@/components/dailyTaskTemplate.vue'
import PageHeader from '@/components/Header'
export default {
  data () {
    return {
      isModalVisible: false,
      location: '',
      isCakeModalVisible: false,
      isUpdateCakeModalVisible: false,
      binding: '',
      tasks: null,
      taskImageUrl: null,
      task: null,
      cakeColor: '',
      User: '',
      messages: '',
      message: '',
      socket: io('10.0.0.18:8081'),
      text: 'Message',
      Initial: '',
      InitialCake: '',
      InitialUpdateCake: '',
      madeBy: '',
      decoratedBy: '',
      pickedUp: '',
      cakes: null,
      unsortedCakes: null,
      sorted: null,
      cake: '',
      dueDate: '',
      customerName: '',
      customerBuildName: '',
      cakeMessage: '',
      verification: '',
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
    modal1,
    modal2,
    updateCake,
    pageTemplate,
    PageHeader
  },
  async mounted () {
    this.getLocation()
    // this.cakeColor = 'red'
  },
  methods: {
    async sortCakeByDate (data) {
      var d = new Date()
      var MOY = d.getMonth()
      var DOW = d.getDate()
      MOY++
      if (MOY.toString().length < 2) {
        MOY = '0' + MOY.toString()
      }
      if (DOW.toString().length < 2) {
        DOW = '0' + DOW.toString()
      }
      var dates = []
      var mock = []
      var dateIndex = []
      var dateindex
      for (var i = 0; i < data.length; i++) {
        dates[i] = data[i].dueDate
        mock[i] = data[i]
      }
      dates.sort((d1, d2) => {
        let day1 = d1.substring(3, 5)
        let day2 = d2.substring(3, 5)
        let month1 = d1.substring(0, 2)
        let month2 = d2.substring(0, 2)
        if (month1 !== month2) {
          return month1 - month2
        } else {
          return day1 - day2
        }
      })
      for (var j = 0; j < dates.length; j++) {
        for (var k = 0; k < data.length; k++) {
          if (dates[j] === data[k].dueDate) {
            dateIndex[j] = k
          }
        }
      }
      for (var l = 0; l < data.length; l++) {
        dateindex = dateIndex[l]
        data[l] = mock[dateindex]
      }
      this.cakes = data
      for (var m = 0; m < data.length; m++) {
        this.cakes[m].cakeColor = 'blue'
        if (data[m].dueDate.substring(0, 2) === MOY && (data[m].dueDate.substring(3, 5) - DOW) <= 2) {
          this.cakes[m].cakeColor = 'red'
        } else if (data[m].dueDate.substring(0, 2) === MOY && (data[m].dueDate.substring(3, 5) - DOW) <= 7) {
          this.cakes[m].cakeColor = 'orange'
        } else if ((parseFloat(data[m].dueDate.substring(0, 2)) - 1) === parseFloat(MOY) && ((parseFloat(data[m].dueDate.substring(3, 5)) + 30) - parseFloat(DOW)) <= 4) {
          this.cakes[m].cakeColor = 'red'
        } else if ((parseFloat(data[m].dueDate.substring(0, 2)) - 1) === parseFloat(MOY) && ((parseFloat(data[m].dueDate.substring(3, 5)) + 30) - parseFloat(DOW)) <= 9) {
          this.cakes[m].cakeColor = 'orange'
        }
      }
    },
    async getTasks () {
      this.tasks = (await taskService.taskIndex(this.$store.state.token)).data
    },
    async getLocation () {
      this.verification = (await taskService.getLocation(this.$store.state.token)).data
      if (this.verification.error === 'error') {
        this.$router.push({ name: 'login' })
      } else {
        this.location = this.verification.store
        this.getTasks()
        this.getMessages()
        this.getLiveMessages()
        this.getCakes()
      }
    },
    async getMessages () {
      this.messages = (await taskService.getMessage(this.$store.state.token)).data
    },
    getLiveMessages () {
      this.socket.on('MESSAGE', (data, location) => {
        if (this.location === location) {
          this.messages = [...this.messages, data]
        }
      })
    },
    async getCakes () {
      this.unsortedCakes = (await cakeService.cakeIndex(this.$store.state.token)).data
      this.sortCakeByDate(this.unsortedCakes)
    },
    showModal (task) {
      this.task = task
      this.isModalVisible = true
    },
    closeModal () {
      this.removeTask(this.task)
      this.isModalVisible = false
    },
    showCakeModal (customerName) {
      this.customerBuildName = customerName
      this.isCakeModalVisible = true
    },
    closeCakeModal () {
      this.makeCake(this.customerBuildName, this.InitialCake)
      this.isCakeModalVisible = false
    },
    showUpdateCakeModal (customerName, initial) {
      this.InitialCake = initial
      this.customerBuildName = customerName
      this.isUpdateCakeModalVisible = true
    },
    closeUpdateCakeModal () {
      this.makeCake(this.customerBuildName, this.InitialCake, this.InitialUpdateCake)
      this.isUpdateCakeModalVisible = false
    },
    initial (initial, tasked) {
      this.Initial = initial
    },
    initialCake (initial, made) {
      this.InitialCake = initial
    },
    initialUpdateCake (initial, made) {
      this.InitialUpdateCake = initial
    },
    pickUpCake (cake, makeInitial, updateInitial) {
      this.pickedUp = true
      this.makeCake(cake, makeInitial, updateInitial, this.pickedUp)
    },
    async removeTask (task) {
      await taskService.deleteTask(this.$store.state.token, {task: task, initial: this.Initial})
      // this.$router.push({ name: 'dashboard' })
      this.getTasks()
    },
    async postMessage (e) {
      e.preventDefault()
      if (this.message !== '') {
        this.socket.emit('SEND_MESSAGE', {
          user: this.$store.state.name,
          message: this.message,
          token: this.$store.state.token
        })
        await taskService.newMessage({
          message: this.message,
          user: this.$store.state.name
        }, this.$store.state.token)
      }
      this.message = ''
    },
    async getCakeInv () {
      await cakeService.getCakeInv()
    },
    async makeCake (cake, makeInitial, updateInitial, pickedUp) {
      await cakeService.makeCake(this.$store.state.token, {makeInitial: makeInitial, updateInitial: updateInitial, cake: cake, pickedUp: pickedUp})
      this.getCakes()
    },
    updateTemplate () {
      this.$root.$emit('updateTemplate')
    },
    decorateAlert () {
      alert('Please make the cake first!')
    },
    pickedUpAlert () {
      alert('Please check that the cake has been created and decorated!')
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
  background-color: #C2C8D8;
  border-radius: 5px;
  padding: 10px;
  margin: 7px 5px;
  font-size: 15px;
  color: black;
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
.messageBoard{
  background-color: white;
  border: 2px solid grey;
}
</style>
