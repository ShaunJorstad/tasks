import './App.css';
import React from 'react';
import NavBar from './NavBar.js';
import Content from './Content.js';
import 'tailwindcss/tailwind.css';
import { Task, List, Lists } from './DataStructures.js';
import { getLists, createList, testConnection } from './Queries.js';

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
    // testConnection();
    this.selectNewList = this.selectNewList.bind(this)
    this.createList = this.createList.bind(this)
  }

  selectNewList = (listName) => {
    this.setState({
      selectedList: listName
    })
  }

  createList() {
    let newList = createList({
      name: 'new list',
      color: 'blue', 
      order: Object.values(this.state.lists).length -2
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
          lists={this.state.lists} />
      </div>
    );
  }
}

export default App;
