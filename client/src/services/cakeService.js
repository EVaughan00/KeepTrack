import Api from '@/services/Api'

export default {
  cakeIndex () {
    return Api().get('cakes')
  },
  cakeIndexCompleted () {
    return Api().get('completed')
  },
  newCake (cake) {
    return Api().post('cakes', cake)
  },
  removeCake (task, initial) {
    return Api().post('tasks/' + task.task, initial)
  }
}
