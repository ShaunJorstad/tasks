import { db } from './FirebaseConfig';
import { List, Task } from './DataStructures.js';
import { v4 as uuidv4 } from 'uuid';

let allLists = null;
let today = 0;
let upcoming = 0;
let all = 0;

// Lists Management
export function getLists() {
    if (allLists != null) {
        return new Promise((resolve, reject) => {
            resolve(
                allLists
            );
        });
    }
    return new Promise((resolve, reject) => {
        // console.log("querying firebase");
        db.collection('lists').get().then((lists) => {
            let tmplists = {};
            lists.forEach((list) => {
                tmplists[list.data().config.id] = new List(list.data());
            });
            tmplists.today = new List({ config: {name: 'today', color: 'blue', order: -1, id: 0 }, taskCount: 0, sections: { default: {order: 0, tasks: {}}}})
            tmplists.upcoming = new List({ config: {name: 'upcoming', color: 'blue', order: -1, id: 0 }, taskCount: 0, sections: { default: {order: 0, tasks: {}}}})
            tmplists.all = new List({ config: {name: 'all', color: 'blue', order: -1, id: 0 }, taskCount: 0, sections: { default: {order: 0, tasks: {}}}})
            
            allLists = tmplists;
            resolve(allLists);
        }).catch(function (error) {
            reject("error getting document");
        });
    });
}

export function getCounts() {
    if (allLists != null) {
        allLists.forEach((list) => {

        });
    }
    return getLists().then((result) => {
        getCounts();
    });
}

export function removeList(listId) {
    db.collection('lists').doc(listId).delete()
}

/**
 * adds a new list to firestore
 * @param {*} config  {name, order, color}
 */
export function createList(config) {
    // create list locally 
    let listConfig = config
    listConfig['id'] = uuidv4()
    let newList = new List({
        config: listConfig,
        taskCount: 0,
        sections: {
            default: {
                order: 0,
                tasks: {}
            },
            second: {
                order: 1,
                tasks: {}
            }
        }
    })
    // create list remotely
    // console.log(JSON.stringify(newList.toObject()))
    db.collection("lists").doc(listConfig.id).set(newList.toObject())
    return newList;
}

export function updateListConfig(listName, config) {

}

export function changeListName(newName, listId) {
    db.collection("lists").doc(listId).update({
        "config.name": newName
    })
}

export function changeListColor(newColor, listId) {
    db.collection("lists").doc(listId).update({
        "config.color": newColor
    })
}


// Task Management
export function createTask(task) {

}

export function completeTask(task) {

}

export function editTask(task) {

}

export function testConnection() {
    createList({
        name: 'yet another list!',
        order: 0,
        color: 'blue'
    });
}

// export function createNewList() {
//     createList({

//     })
// }