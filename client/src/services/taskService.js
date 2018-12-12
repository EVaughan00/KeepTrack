import Api from '@/services/Api'

export default {
  taskIndex () {
    return Api().get('tasks')
  },
  newTask (task) {
    return Api().post('tasks', task)
  }
}
