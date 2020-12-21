import { v4 as uuidv4 } from 'uuid';

export class Task {
    constructor(content, description = "", due = null) {
        this.content = content;
        this.id = uuidv4();
        this.description = description;
        this.due = due;
    }

    toObject() {
        return {
            content: this.content,
            id: this.id,
            description: this.description,
            due: this.due
        };
    }
}



export class List {
    constructor(listData) {
        this.name = listData.config.name
        this.color = listData.config.color
        this.order = listData.config.order
        this.id = listData.config.id
        this.sections = listData.sections
        this.taskCount = listData.taskCount
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
}