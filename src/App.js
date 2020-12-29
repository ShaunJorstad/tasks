import './App.css';
import React from 'react';
import NavBar from './components/NavBar.js';
import Content from './components/Content.js';
import { db, inc, dec, del, Timestamp } from './FirebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import Config from './config.json';
import 'tailwindcss/tailwind.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedList: "59b98e7e-33be-4faa-b076-c4e9133a1bb7",
      lists: {},
      tasks: {}
    }
    this.pullFirestoreData()
    this.selectNewList = this.selectNewList.bind(this)
    this.getList = this.getList.bind(this)
    this.createList = this.createList.bind(this)
    this.editList = this.editList.bind(this)
    this.deleteList = this.deleteList.bind(this)
    this.createTask = this.createTask.bind(this)
    this.editTask = this.editTask.bind(this)
    this.completeTask = this.completeTask.bind(this)

    this.rootHandlers = {
      selectNewList: this.selectNewList,
      getList: this.getList,
      createList: this.createList,
      editList: this.editList,
      deleteList: this.deleteList,
      createTask: this.createTask,
      editTask: this.editTask,
      completeTask: this.completeTask
    }
  }

  selectNewList(listName) {
    this.setState({
      selectedList: listName
    })
  }

  pullFirestoreData() {
    db.collection('users').doc(Config.email).get().then((doc) => {
      if (doc.exists) {
        // parse the lists
        let tmpLists = {}
        let tmpTasks = {}
        for (let listID in doc.data().lists) {
          tmpLists[listID] = doc.data().lists[listID]
        }
        // parse the tasks
        for (let taskID in doc.data().tasks) {
          tmpTasks[taskID] = doc.data().tasks[taskID]
          if (tmpTasks[taskID].due !== null) {
            tmpTasks[taskID].due = doc.data().tasks[taskID].due.toDate()
          }
        }
        this.setState({
          lists: tmpLists,
          tasks: tmpTasks
        })
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    })
  }

  getList(listID) {
    return this.state.lists[listID]
  }

  createList() {
    let newList = {
      color: "blue",
      order: Object.values(this.state.lists).length,
      name: "new list",
      id: uuidv4(),
      sections: {}
    }
    let currentLists = this.state.lists
    currentLists[newList.id] = newList
    this.setState({
      lists: currentLists
    })
    let docUpdate = {}
    docUpdate[`lists.${newList.id}`] = newList
    db.collection('users').doc(Config.email).update(docUpdate)
  }

  editList(id, config) {
    let docChanges = {}
    let updateLists = this.state.lists
    for (let key in config) {
      docChanges[`lists.${id}.${key}`] = config[key]
      updateLists[id][key] = config[key]
    }
    this.setState({ lists: updateLists })
    db.collection('users').doc(Config.email).update(docChanges).catch(function (error) {
      console.log("Error getting document:", error);
    })
  }

  deleteList(id) {
    let updateLists = this.state.lists
    delete updateLists.id
    this.setState({ lists: updateLists })
    let deleteList = {}
    deleteList[`lists.${id}`] = del
    let removeTasks = this.state.tasks
    Object.values(removeTasks).filter(task => task.listID === id).forEach(task => {
      delete removeTasks[task.id]
      deleteList[`tasks.${task.id}`] = del
    })
    db.collection('users').doc(Config.email).update(deleteList)
  }

  createTask(listID, sectionID = null) {
    let newTask = {
      content: '',
      due: null,
      id: uuidv4(),
      notes: '',
      order: Object.values(this.state.tasks).filter(task => task.listID === listID && task.sectionID === sectionID).length +1,
      listID: listID,
      sectionID: sectionID
    }
    let updateTasks = this.state.tasks
    updateTasks[newTask.id] = newTask
    this.setState({
      tasks: updateTasks
    })
    let pushTask = {}
    pushTask[`tasks.${newTask.id}`] = newTask
    db.collection('users').doc(Config.email).update(pushTask)
  }

  editTask(taskID, config, final = false) {
    let updateTasks = this.state.tasks
    for (let key in config) {
      updateTasks[taskID][key] = config[key]
    }
    this.setState({ tasks: updateTasks })
    if (final) {
      let pushChanges = {}
      let task = this.state.tasks[taskID]
      for (let key in task) {
        pushChanges[`tasks.${taskID}.${key}`] = task[key]
      }
      if (task.due !== null) {
        pushChanges[`tasks.${taskID}.due`] = Timestamp.fromDate(task.due)
      }

      db.collection('users').doc(Config.email).update(pushChanges)
    }
  }

  completeTask(taskID) {
    let updateTasks = this.state.tasks
    delete updateTasks[taskID]
    this.setState({tasks: updateTasks})
    let pushChanges = {}
    pushChanges[`tasks.${taskID}`] = del
    db.collection('users').doc(Config.email).update(pushChanges)
  }

  render() {
    return (
      <div className="flex w-full h-screen">
        <NavBar
          lists={this.state.lists}
          tasks={this.state.tasks}
          selectedList={this.state.selectedList}
          rootHandlers={this.rootHandlers}
        />
        <Content
          lists={this.state.lists}
          tasks={this.state.tasks}
          selectedList={this.state.selectedList}
          rootHandlers={this.rootHandlers}
        />
      </div>
    );
  }
}

export default App;