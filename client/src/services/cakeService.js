import Api from '@/services/Api'

export default {
  cakeIndex (location) {
    return Api().get('cakes/' + location)
  },
  cakeIndexCompleted () {
    return Api().get('completed')
  },
  newCake (cake) {
    return Api().post('cakes', cake)
  },
  removeCake (task, initial) {
    return Api().post('tasks/' + task.task, initial)
  },
  newCakeInv (cake) {
    return Api().post('cakesinv', cake)
  },
  getCakeInv () {
    return Api().get('cakesinv')
  },
  makeCake (cake, initial) {
    // console.log(initial + ' Made this cake for ' + cake)
    return Api().post('cakes/' + cake, initial)
  }
}
