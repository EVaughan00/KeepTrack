import Api from '@/services/Api'

export default {
  taskIndex () {
    return Api().get('tasks')
  },
  taskIndexCompleted () {
    return Api().get('completed')
  },
  newTask (task) {
    return Api().post('tasks', task)
  },
  deleteTask (task, initial) {
    return Api().post('tasks/' + task.task, initial)
  },
  removeTask (task) {
    return Api().delete('tasks/' + task.task)
  },
  getMessage () {
    return Api().get('messages')
  },
  newMessage (message) {
    return Api().post('messages', message)
  },
  AddTaskToDash (task) {
    return Api().post('addtodash/' + task.task)
  }
}
