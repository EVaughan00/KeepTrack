import Api from '@/services/Api'

export default {
  taskIndex (token) {
    return Api().get('tasks/incompleted/' + token)
  },
  taskIndexCompleted (token) {
    return Api().get('tasks/completed/' + token)
  },
  newTask (task, token) {
    return Api().post('tasks/add/' + token, task)
  },
  deleteTask (token, task) {
    return Api().post('tasks/complete/' + token, task)
  },
  removeTask (task, token) {
    return Api().post('tasks/remove/' + token, task)
  },
  getMessage (token) {
    return Api().get('messages/' + token)
  },
  newMessage (message, token) {
    return Api().post('messages/' + token, message)
  },
  AddTaskToDash (task, token) {
    return Api().post('/tasks/dash/' + token, task)
  },
  getLocation (token) {
    return Api().get('location/' + token)
  },
  getTemplate (token) {
    return Api().get('template/' + token)
  },
  newTemplate (template, token) {
    return Api().post('template/' + token, template)
  }
}
