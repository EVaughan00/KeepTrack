const User = require('../models/user')
const config = require('../config/config')
const Promise = require('bluebird')
const Tasks = require('../models/task')

module.exports = {
  getIncompTasks (store, res) {
    if (store!=null) {
      try{
        const task = Tasks.find({ $and: [{ completed: false }, {store: store}] }, function (err, task) {
          if (err) {
            console.log('error is '+ err)
          }
          res.send(task)
        })
      } catch (err) {
        res.status(500).send({
          error: 'error occured'
        })
      }
    } else {
      console.log('Not Authenticated')
    }
  },

  getCompTasks (store, res) {
    if (store!=null) {
      try{
        const task = Tasks.find({ $and: [{ completed: true }, { store: store }] }, function (err, task) {
          res.send(task)
        })
      } catch (err) {
        res.status(500).send({
          error: 'error occured'
        })
      }
    }
  },

  postNewTask (store, req, res) {
    if (store!=null) {
      try{
        var newTask = new Tasks({
          task: req.body.task,
          taskImageUrl: req.body.taskImageUrl,
          completed: req.body.completed,
          initial: null,
          store: store
        })
        newTask.save(function (err) {
          console.log(err);
        })
        res.send(newTask)
        } catch (err) {
        console.log(err);
        res.status(500).send({
          error: 'error occured'
        })
      }
    }
  },

  postTaskToDash (store, res, task) {
    try{
      Tasks.updateOne({ $and: [{ task: task }, {store: store}] }, { $set: { completed: "false", initial: null }}, function (err, res) {
        if (err) {
          console.log(err)
        }
      })
      res.send({ message: `${task} added to dash`})
      } catch (err) {
      console.log(err);
      res.status(500).send({
        error: 'error occured'
      })
    }
  },

  deleteTask (store, task, res) {
    try{
      Tasks.deleteOne({ $and: [{ task: task }, {store: store}] }, function (err, res) {
        if (err) {
          console.log(err)
        }
      })
      res.send({ message: `${task} removed`})
      } catch (err) {
      console.log(err);
      res.status(500).send({
        error: 'error occured'
      })
    }
  },

  postCompletedTask (store, initial, task, res) {
    if (store!=null) {
      try{
        Tasks.updateOne({ $and: [{ task: task }, {store: store}] }, { $set: { completed: "true", initial: initial }}, function (err, res) {
          if (err) {
            console.log(err)
          }
        })
        console.log(task)
        res.send({ message: `${task} completed by ${initial}`})
        } catch (err) {
        console.log(err);
        res.status(500).send({
          error: 'error occured'
        })
      }
    }
  }
}
