import { db, inc, dec, del } from './FirebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import Config from './config.json';


class data {
    lists
    tasks
    constructor() {
        this.lists = {}
        this.tasks = {}

        console.log(Config.email);
        // todo: fetch all firebase data
        
    }

    getList(listID) {
        return this.lists[listID]
    }

    getLists() {
        return this.lists        
    }

    // lists
    createList() {
        let newList = {
            color: "blue",
            order: Object.values(this.lists).length,
            name: "new list",
            id: uuidv4(),
            sections: {}
        }
        this.lists[newList.id] = newList
        let docUpdate = {}
        docUpdate[`lists.${newList.id}`] = newList
        db.collection('users').doc(Config.email).update(docUpdate)
    }

    editList(id, config) {
        let docChanges = {}
        for (let key in config) {
            docChanges[`lists.${id}.${key}`] = config[key]
            this.lists.id[key] = config[key]
        }
        db.collection('users').doc(Config.email).update(docChanges)
    }

    deleteList(id) {
        delete this.lists.id 
        let deleteList = {} 
        deleteList[`lists.${id}`] = del
        db.collection('users').doc(Config.email).update(deleteList)
    }

    // sections
    createSection(listID) {

    }

    editSection(listID, sectionID, changes) {

    }

    deleteSection(listID, sectionID) {

    }

    // tasks
    // createTask(listID, sectionID) {

    // }

    // editTask(listID, sectionID, taskID, changes) {

    // }

    // completeTask(listID, sectionID, taskID) {

    // }

    // getAllTasks() {

    // }

    // getTodayTasks() {

    // }

    // getUpcomingTasks() {

    // }
}

export var dataInstance = new data();