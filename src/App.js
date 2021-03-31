import "./App.css";
import React from "react";
import NavBar from "./components/NavBar.js";
import Content from "./components/Content.js";
import { db, inc, dec, del, auth, Timestamp } from "./FirebaseConfig";
import { v4 as uuidv4 } from "uuid";
import Onboard from "./components/Onboard.js";
import "tailwindcss/tailwind.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedList: "today",
      lists: {},
      tasks: {},
      user: null,
    };
    if (this.state.user !== null) {
      this.pullFirestoreData();
    }
    this.selectNewList = this.selectNewList.bind(this);
    this.getList = this.getList.bind(this);
    this.createList = this.createList.bind(this);
    this.editList = this.editList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.createTask = this.createTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.createSection = this.createSection.bind(this);
    this.editSection = this.editSection.bind(this);
    this.deleteSection = this.deleteSection.bind(this);
    this.batchDeleteTasks = this.batchDeleteTasks.bind(this);

    this.rootHandlers = {
      selectNewList: this.selectNewList,
      getList: this.getList,
      createList: this.createList,
      editList: this.editList,
      deleteList: this.deleteList,
      createTask: this.createTask,
      editTask: this.editTask,
      completeTask: this.completeTask,
      createSection: this.createSection,
      editSection: this.editSection,
      deleteSection: this.deleteSection,
      batchDeleteTasks: this.batchDeleteTasks,
    };
  }

  componentDidMount = () => {
    auth.onAuthStateChanged((userAuth) => {
      this.setState({ user: userAuth });
      this.pullFirestoreData();
    });
  };

  selectNewList(listName) {
    this.setState({
      selectedList: listName,
    });
  }

  createUserDocument() {
    console.log("Creating user document");
    db.collection("users")
      .doc(this.state.user.email)
      .set({
        lists: {},
        tasks: {},
      })
      .then(() => {
        this.pullFirestoreData();
      });
  }

  pullFirestoreData() {
    db.collection("users")
      .doc(this.state.user.email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // parse the lists
          let tmpLists = {};
          let tmpTasks = {};
          for (let listID in doc.data().lists) {
            tmpLists[listID] = doc.data().lists[listID];
          }
          // parse the tasks
          for (let taskID in doc.data().tasks) {
            tmpTasks[taskID] = doc.data().tasks[taskID];
            if (tmpTasks[taskID].due !== null) {
              tmpTasks[taskID].due = doc.data().tasks[taskID].due.toDate();
            }
          }
          this.setState({
            lists: tmpLists,
            tasks: tmpTasks,
          });
        } else {
          console.log("No such document!");
          this.createUserDocument();
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  getList(listID) {
    return this.state.lists[listID];
  }

  createList() {
    let newList = {
      color: "blue",
      order: Object.values(this.state.lists).length,
      name: "new list",
      id: uuidv4(),
      sections: {},
      parentList: null,
    };
    let currentLists = this.state.lists;
    currentLists[newList.id] = newList;
    this.setState({
      lists: currentLists,
    });
    let docUpdate = {};
    docUpdate[`lists.${newList.id}`] = newList;
    db.collection("users").doc(this.state.user.email).update(docUpdate);
  }

  editList(id, config) {
    let docChanges = {};
    let updateLists = this.state.lists;
    for (let key in config) {
      docChanges[`lists.${id}.${key}`] = config[key];
      updateLists[id][key] = config[key];
    }
    this.setState({ lists: updateLists });
    db.collection("users")
      .doc(this.state.user.email)
      .update(docChanges)
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  createSection(listID) {
    let updatedLists = this.state.lists;
    let newSection = {
      name: "",
      id: uuidv4(),
      order: Object.values(updatedLists[listID].sections).length + 1,
    };
    updatedLists[listID].sections[newSection.id] = newSection;
    this.setState({
      lists: updatedLists,
    });

    let pushSection = {};
    pushSection[`lists.${listID}.sections.${newSection.id}`] = newSection;
    db.collection("users").doc(this.state.user.email).update(pushSection);
  }

  editSection(listID, sectionID, changes) {
    let updateLists = this.state.lists;
    let pushChanges = {};
    for (let key in changes) {
      updateLists[listID].sections[sectionID][key] = changes[key];
      pushChanges[`lists.${listID}.sections.${sectionID}.${key}`] =
        changes[key];
    }
    this.setState({ lists: updateLists });
    db.collection("users").doc(this.state.user.email).update(pushChanges);
  }

  deleteSection(listID, sectionID) {
    let updateLists = this.state.lists;
    let updateTasks = this.state.tasks;
    let pushChanges = {};

    delete updateLists[listID].sections[sectionID];
    pushChanges[`lists.${listID}.sections.${sectionID}`] = del;

    Object.values(updateTasks)
      .filter((task) => task.sectionID === sectionID)
      .forEach((task) => {
        delete updateTasks[task.id];
        pushChanges[`tasks.${task.id}`] = del;
      });

    this.setState({ lists: updateLists, tasks: updateTasks });
    db.collection("users").doc(this.state.user.email).update(pushChanges);
  }

  batchDeleteTasks(taskIDs) {
    let updateTasks = this.state.tasks;
    let pushChanges = {};
    taskIDs.forEach((taskID) => {
      delete updateTasks[taskID];
      pushChanges[`tasks.${taskID}`] = del;
    });
    this.setState({ tasks: updateTasks });
    db.collection("users").doc(this.state.user.email).update(pushChanges);
  }

  deleteList(id) {
    let updateLists = this.state.lists;
    delete updateLists[id];
    let deleteList = {};
    deleteList[`lists.${id}`] = del;
    let removeTasks = this.state.tasks;
    Object.values(removeTasks)
      .filter((task) => task.listID === id)
      .forEach((task) => {
        delete removeTasks[task.id];
        deleteList[`tasks.${task.id}`] = del;
      });
    this.setState({
      lists: updateLists,
      tasks: removeTasks,
      selectedList: "today",
    });
    console.log(this.state.lists);
    db.collection("users").doc(this.state.user.email).update(deleteList);
  }

  createTask(listID, sectionID = null, due = null) {
    let newTask = {
      content: "",
      due: due,
      id: uuidv4(),
      notes: "",
      order:
        Object.values(this.state.tasks).filter(
          (task) => task.listID === listID && task.sectionID === sectionID
        ).length + 1,
      listID: listID,
      sectionID: sectionID,
      parentTask: null,
    };
    let updateTasks = this.state.tasks;
    updateTasks[newTask.id] = newTask;
    this.setState({
      tasks: updateTasks,
    });
    let pushTask = {};
    pushTask[`tasks.${newTask.id}`] = newTask;
    if (due !== null) {
      pushTask[`tasks.${newTask.id}.due`] = Timestamp.fromDate(due);
    }
    db.collection("users").doc(this.state.user.email).update(pushTask);
    return newTask.id;
  }

  editTask(taskID, config, final = false) {
    let updateTasks = this.state.tasks;
    for (let key in config) {
      updateTasks[taskID][key] = config[key];
    }
    this.setState({ tasks: updateTasks });
    if (final) {
      let pushChanges = {};
      let task = this.state.tasks[taskID];
      for (let key in task) {
        pushChanges[`tasks.${taskID}.${key}`] = task[key];
      }
      if (task.due !== null) {
        pushChanges[`tasks.${taskID}.due`] = Timestamp.fromDate(task.due);
      }

      db.collection("users").doc(this.state.user.email).update(pushChanges);
    }
  }

  completeTask(taskID) {
    let updateTasks = this.state.tasks;
    delete updateTasks[taskID];
    let pushChanges = {};

    Object.values(updateTasks)
      .filter((task) => task.parentTask === taskID)
      .forEach((childTask) => {
        delete updateTasks[childTask.id];
        pushChanges[`tasks.${childTask.id}`] = del;
      });
    this.setState({ tasks: updateTasks });
    pushChanges[`tasks.${taskID}`] = del;
    db.collection("users").doc(this.state.user.email).update(pushChanges);
  }

  render() {
    if (this.state.user === null) {
      return <Onboard />;
    }
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
