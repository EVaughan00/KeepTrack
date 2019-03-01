<template>
        <div>
          <v-layout row wrap>
            <v-flex>
              <table width="100%" height="378px;">
                <tr>
                  <td><input type="text" name="in1" value="" class="initialInput" v-model="in1"><input type="text" name="in1" value="" class="daily" v-model="daily1"></td>
                </tr>
                <tr>
                  <td><input type="text" name="in2" value="" class="initialInput" v-model="in2"><input type="text" name="in1" value="" class="daily" v-model="daily2"></td>
                </tr>
                <tr>
                  <td><input type="text" name="in3" value="" class="initialInput" v-model="in3"><input type="text" name="in1" value="" class="daily" v-model="daily3"></td>
                </tr>
                <tr>
                  <td><input type="text" name="in4" value="" class="initialInput" v-model="in4"><input type="text" name="in1" value="" class="daily" v-model="daily4"></td>
                </tr>
                <tr>
                  <td><input type="text" name="in5" value="" class="initialInput" v-model="in5"><input type="text" name="in1" value="" class="daily" v-model="daily5"></td>
                </tr>
                <tr>
                  <td><input type="text" name="in6" value="" class="initialInput" v-model="in6"><input type="text" name="in1" value="" class="daily" v-model="daily6"></td>
                </tr>
                <tr>
                  <td>
                    <input type="text" name="in7" value="" class="initialInput" v-model="in7"><input type="text" name="in6" value="" class="extra" v-model="ext1">{{this.extra1}}
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" name="in8" value="" class="initialInput" v-model="in8"><input type="text" name="in6" value="" class="extra" v-model="ext2">{{this.extra2}}
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" name="in9" value="" class="initialInput" v-model="in9"><input type="text" name="in6" value="" class="extra" v-model="ext3">{{this.extra3}}
                  </td>
                </tr>
              </table>
            </v-flex>
          </v-layout>
        </div>
</template>
<script>
import taskService from '@/services/taskService'
export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      error: null,
      response: null,
      exists: '',
      day: '',
      cakeSize: 'L',
      cake: 'Cake Batter',
      numberOfCake: '3',
      daily1: '',
      daily2: '',
      daily3: '',
      daily4: '',
      daily5: '',
      daily6: '',
      in1: '',
      in2: '',
      in3: '',
      in4: '',
      in5: '',
      in6: '',
      in7: '',
      in8: '',
      in9: '',
      ext1: 'Extra:',
      ext2: 'Extra:',
      ext3: 'Extra:',
      extra1: '',
      extra2: '',
      extra3: ''
    }
  },
  methods: {
    async getTemplate (day) {
      const templates = (await taskService.getTemplate(this.$store.state.token, day)).data
      try {
        this.daily1 = templates[0].daily1
        this.daily2 = templates[0].daily2
        this.daily3 = templates[0].daily3
        this.daily4 = templates[0].daily4
        this.daily5 = templates[0].daily5
        this.daily6 = templates[0].daily6
        this.in1 = templates[0].in1
        this.in2 = templates[0].in2
        this.in3 = templates[0].in3
        this.in4 = templates[0].in4
        this.in5 = templates[0].in5
        this.in6 = templates[0].in6
        this.in7 = templates[0].in7
        this.in8 = templates[0].in8
        this.in9 = templates[0].in9
        this.ext1 = templates[0].ext1
        this.ext2 = templates[0].ext2
        this.ext3 = templates[0].ext3
        this.extra1 = templates[0].extra1
        this.extra2 = templates[0].extra2
        this.extra3 = templates[0].extra3
      } catch (err) {
        // console.log(err)
      }
    }
  },
  async mounted () {
    this.day = await this.$store.state.daySelect
    this.getTemplate(this.day)
    // this.updateSheet()
    await this.$root.$on('updateSheet', () => {
      taskService.updateTemplate({
        daily1: this.daily1,
        daily2: this.daily2,
        daily3: this.daily3,
        daily4: this.daily4,
        daily5: this.daily5,
        daily6: this.daily6,
        in1: this.in1,
        in2: this.in2,
        in3: this.in3,
        in4: this.in4,
        in5: this.in5,
        in6: this.in6,
        in7: this.in7,
        in8: this.in8,
        in9: this.in9,
        ext1: this.ext1,
        ext2: this.ext2,
        ext3: this.ext3,
        extra1: this.extra1,
        extra2: this.extra2,
        extra3: this.extra3,
        day: this.day
      }, this.$store.state.token)
    })
    await this.$root.$on('refreshSheet', () => {
      this.day = this.$store.state.daySelect
      this.getTemplate(this.day)
    })
  }
}
</script>

<style scoped>
.error{
  color: red;
}
.danger-alert {
  color: red;
}
table{
  border: 2px solid grey;
  background-color: white;
}
th{
  font-size: 20px;
  text-align: center;
  max-width: 10px;
}
td{
  font-size: 20px;
  text-align: left;
  max-width: 10px;
  padding-left: 30px;
}
.initialInput{
  width: 8%;
  margin-right: 5px;
  border: solid grey;
  border-width: 0px 0px 2px 0px;
  font-weight: bold;
  text-align: center;
}
.daily{
  width: 80%;
}
.extra{
  width: 11%
}
</style>
