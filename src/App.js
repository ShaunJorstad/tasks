import './App.css';
import React from 'react';
import NavBar from './components/NavBar.js';
import Content from './components/Content.js';
import 'tailwindcss/tailwind.css';
import { Task, List, Lists } from './DataStructures.js';
import { getLists, updateTask, changeListName, changeListColor, removeList, fcreateList, fireCreateTask, testConnection, fcompleteTask } from './Queries.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      lists: {},
      todayCount: 0,
      upcomingCount: 0,
      allCount: 0,
      selectedList: "today",
    }
    if (Object.keys(this.state.lists).length === 0) {
      this.constructLists();
    }
    this.selectNewList = this.selectNewList.bind(this)
    this.updateListName = this.updateListName.bind(this)
    this.updateListColor = this.updateListColor.bind(this)
    this.deleteList = this.deleteList.bind(this)
    this.createList = this.createList.bind(this)
    this.editTask = this.editTask.bind(this)
    this.createTask = this.createTask.bind(this)
    this.completeTask = this.completeTask.bind(this)
  }

  completeTask(listId, sectionName, taskId) {
    let updatedLists = this.state.lists
    updatedLists[listId].completeTask(sectionName, taskId)
    this.setState({lists: updatedLists})
    fcompleteTask(listId, sectionName, taskId)
  }

  createTask(listId, sectionName) {
    let updatedLists = this.state.lists
    let task = updatedLists[listId].createTask(listId, sectionName)
    this.setState({ lists: updatedLists })
    fireCreateTask(listId, sectionName, task)
  }

  editTask(listId, sectionName, taskId, taskData, publish = false) {
    if (publish) {
      // push to firestore
      let taskObject = this.state.lists[listId].sections[sectionName].tasks[taskId].toObject()
      updateTask(listId, sectionName, taskId, taskObject)
      return
    }
    let updatedLists = this.state.lists
    updatedLists[listId].sections[sectionName].tasks[taskId].update(taskData)
    this.setState({ lists: updatedLists })
  }

  updateListName(newName, listId) {
    let updatedLists = this.state.lists
    updatedLists[listId].name = newName
    this.setState({
      lists: updatedLists
    })
    changeListName(newName, listId)
  }

  updateListColor(newColor, listId) {
    let updatedLists = this.state.lists
    updatedLists[listId].color = newColor
    this.setState({
      lists: updatedLists
    })
    changeListColor(newColor, listId)
  }

  deleteList(listId) {
    let updatedLists = this.state.lists
    delete updatedLists[listId]
    console.log(updatedLists)
    this.setState({
      selectedList: 'today',
      lists: updatedLists
    })
    removeList(listId)
  }

  selectNewList = (listName) => {
    this.setState({
      selectedList: listName
    })
  }

  createList() {
    let newList = fcreateList({
      name: 'new list',
      color: 'blue',
      order: Object.values(this.state.lists).length - 2
    })
    let updatedLists = this.state.lists
    updatedLists[newList.id] = newList
    this.setState({
      lists: updatedLists
    })
  }

  constructLists() {
    getLists().then((currentLists) => {
      this.setState({
        lists: currentLists
      })
    });
  }

  render() {
    return (
      <div className="flex w-full h-screen">
        <NavBar
          lists={this.state.lists}
          todayCount={this.state.todayCount}
          upcomingCount={this.state.upcomingCount}
          allCount={this.state.allCount}
          selectedList={this.state.selectedList}
          selectNewList={this.selectNewList}
          createList={this.createList}
        />
        <Content
          selectedList={this.state.selectedList}
          lists={this.state.lists}
          updateListName={this.updateListName}
          updateListColor={this.updateListColor}
          deleteList={this.deleteList}
          editTask={this.editTask}
          createTask={this.createTask} 
          completeTask={this.completeTask}/>
      </div>
    );
  }
}

export default App;