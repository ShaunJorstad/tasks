import React from 'react';
import Task from './Task.js';
import { getTestData, logData } from '../data.js';

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

        let defaultTasks = Object.values(this.props.tasks).filter(task => task.listID === this.getList().id && task.sectionID === null).sort((a, b) => { return a.order - b.order }).map(task =>
            <Task
                key={task.id}
                lists={this.props.lists}
                selectedList={this.props.selectedList}
                task={task}
                rootHandlers={this.props.rootHandlers}
                selectNewTask={this.selectNewTask}
                activeTask={this.state.activeTask}
            />
        )

        return (
            <div className="w-full">
                {defaultTasks}
                {/* <Task lists={this.props.lists} selectedList={this.props.selectedList} /> */}
            </div>
        );
    }
}

export default ListAll;