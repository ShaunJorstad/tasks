import { db, inc, dec, del } from './FirebaseConfig';
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
            tmplists.today = new List({ config: { name: 'today', color: 'blue', order: -1, id: 0 }, taskCount: 0, sections: { default: { order: 0, tasks: {} } } })
            tmplists.upcoming = new List({ config: { name: 'upcoming', color: 'blue', order: -1, id: 0 }, taskCount: 0, sections: { default: { order: 0, tasks: {} } } })
            tmplists.all = new List({ config: { name: 'all', color: 'blue', order: -1, id: 0 }, taskCount: 0, sections: { default: { order: 0, tasks: {} } } })

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
export function fcreateList(config) {
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
    console.log('pushing to firebase')
    console.log(JSON.stringify(newList))
    console.log(newList.toObject())
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
export function fireCreateTask(listID, sectionName, task) {
    let newTask = {}
    newTask[`sections.${sectionName}.tasks.${task.id}`] = task.toObject()
    newTask[`taskCount`] = inc
    db.collection('lists').doc(listID).update(newTask).then()
}

export function fcompleteTask(listId, sectionName, taskId) {
    let completeTask = {}
    completeTask[`sections.${sectionName}.tasks.${taskId}`] = del
    completeTask[`taskCount`] = dec
    db.collection('lists').doc(listId).update(completeTask)
}

export function updateTask(listId, sectionName, taskId, taskData) {
    let taskUpdate = {}
    for (let key in taskData) {
        taskUpdate[`sections.${sectionName}.tasks.${taskId}.${key}`] = taskData[key]
    }
    console.log('attempting to push to firebase:')
    console.log(taskUpdate)
    db.collection('lists').doc(listId).update(taskUpdate)
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });
}

export function testConnection() {
    fcreateList({
        name: 'yet another list!',
        order: 0,
        color: 'blue'
    });
}

// export function createNewList() {
//     createList({

//     })
// }