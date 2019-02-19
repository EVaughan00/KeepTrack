import Api from '@/services/Api'

export default {
  taskIndex (location) {
    return Api().get('tasks/incompleted/' + location)
  },
  taskIndexCompleted (location) {
    return Api().get('tasks/completed/' + location)
  },
  newTask (task, location) {
    return Api().post('tasks/add/' + location, task)
  },
  deleteTask (location, task) {
    return Api().post('tasks/complete/' + location, task)
  },
  removeTask (task, location) {
    return Api().post('tasks/remove/' + location, task)
  },
  getMessage (location) {
    return Api().get('messages/' + location)
  },
  newMessage (message, location) {
    return Api().post('messages/' + location, message)
  },
  AddTaskToDash (task, location) {
    return Api().post('/tasks/dash/' + location, task)
  },
  getLocation (token) {
    return Api().get('location/' + token)
  }
}
