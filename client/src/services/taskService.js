import Api from '@/services/Api'

export default {
  taskIndex () {
    return Api().get('tasks')
  },
  newTask (task) {
    return Api().post('tasks', task)
  },
  deleteTask (task) {
    console.log('task is ' + task.task)
    return Api().delete('tasks/' + task.task)
  },
  getMessage () {
    return Api().get('messages')
  },
  newMessage (message) {
    return Api().post('messages', message)
  }
}
