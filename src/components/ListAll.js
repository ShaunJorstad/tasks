import React from 'react';
import Task from './Task.js';
import { getTestData, logData } from '../data.js';

class ListAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.getList(),
            activeTask: null,
            activeDate: null
        }
        this.selectNewTask = this.selectNewTask.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.expandDate = this.expandDate.bind(this);
        this.listHandlers = {
            selectNewTask: this.selectNewTask,
            expandDate: this.expandDate
        }
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
        this.setState({ activeTask: id, activeDate: null})
    }

    expandDate(id) {
        this.setState({activeDate: id})
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
                listHandlers={this.listHandlers}
                activeTask={this.state.activeTask}
                activeDate={this.state.activeDate}
            />
        )

        return (
            <div className="w-full h-full">
                {defaultTasks}
                {/* <Task lists={this.props.lists} selectedList={this.props.selectedList} /> */}
            </div>
        );
    }
}

export default ListAll;