import React from 'react';
import Task from './Task.js';

class ListAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.getList(),
            activeTask: null
        }
        this.selectNewTask = this.selectNewTask.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedList !== this.props.selectedList) {
            this.setState({ list: this.getList() });
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.keyPress, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyPress, false);
    }

    keyPress(event) {
        switch (event.keyCode) {
            case 27:
                this.selectNewTask(null)
                break
            default:
                break
        } 
    }

    selectNewTask(id) {
        this.setState({ activeTask: id })
    }

    getList() {
        return this.props.lists[this.props.selectedList]
    }

    render() {
        let tasks = []

        for (let taskID in this.state.list.sections.default.tasks) {
            let tmpTask = this.state.list.sections.default.tasks[taskID]
            tasks.push(tmpTask)
        }

        tasks = tasks.sort((a, b) => { return a.order - b.order }).map(task =>
            <Task
                lists={this.props.lists}
                selectedList={this.props.selectedList}
                id={task.id}
                content={task.content}
                description={task.description}
                due={task.due}
                task={task}
                editTask={this.props.editTask}
                selectNewTask={this.selectNewTask}
                activeTask={this.state.activeTask}
                completeTask={this.props.completeTask}
            />
        )

        return (
            <div className="w-full">
                {tasks}
                {/* <Task lists={this.props.lists} selectedList={this.props.selectedList} /> */}
            </div>
        );
    }
}

export default ListAll;