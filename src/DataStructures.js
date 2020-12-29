import { v4 as uuidv4 } from 'uuid';

export class Task {
    constructor(content, id, description = "", due = null, order = 0) {
        this.content = content;
        this.id = id;
        this.description = description;
        this.due = due;
        this.updateCount = 0;
        this.order = order;
    }

    toObject() {
        return {
            content: this.content,
            // id: this.id,
            description: this.description,
            due: this.due,
            order: this.order
        };
    }

    editContent(text) {
        this.content = text
        this.updateCount += 1;
    }

    update(taskData) {
        for (let key in taskData) {
            this[key] = taskData[key]
        }
    }
}

export class Section {
    constructor(name, data) {
        this.tasks = {}
        this.order = data.order
        Object.entries(data.tasks).forEach((taskData) => {
            this.tasks[taskData[0]] = new Task(taskData[1].content, taskData[0], taskData[1].description, taskData[1].due)
        })
    }
}


export class List {
    constructor(listData) {
        this.name = listData.config.name
        this.color = listData.config.color
        this.order = listData.config.order
        this.id = listData.config.id
        this.sections = {}
        this.taskCount = listData.taskCount
        Object.entries(listData.sections).forEach((sectionData) => {
            this.sections[sectionData[0]] = new Section(sectionData[0], sectionData[1])
        })
    }

    toObject() {
        let object = {
            config: {
                name: this.name,
                color: this.color,
                order: this.order,
                id: this.id
            },
            taskCount: this.taskCount,
            sections: {}
        };
        for (const sectionName in this.sections) {
            let tmpSection = {
                order: this.sections[sectionName].order,
                tasks: {}
            }
            for (const [taskID, task] of Object.entries(this.sections[sectionName].tasks)) {
                tmpSection[taskID] = task.toObject();
            }
            object.sections[sectionName] = tmpSection;
        }
        return object;
    }

    createTask(listId, sectionName) {
        let newTask = new Task("", uuidv4(), "", null, this.taskCount + 1);
        this.taskCount += 1;
        this.sections[sectionName].tasks[newTask.id] = newTask;
        return newTask;
    }

    completeTask(sectionName, taskId) {
        delete this.sections[sectionName].tasks[taskId]
        this.taskCount -= 1;
    }
}