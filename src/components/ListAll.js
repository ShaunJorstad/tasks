import React from 'react';
import Task from './Task.js';
import TaskSection from './TaskSection.js';

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
        this.setState({ activeTask: id, activeDate: null })
    }

    expandDate(id) {
        this.setState({ activeDate: id })
    }

    getList() {
        return this.props.lists[this.props.selectedList]
    }

    getSectionTasks(sectionID) {
        return Object.values(this.props.tasks).filter(task => task.sectionID === sectionID).sort((a, b) => { return a.order - b.order })
    }

    render() {
        let defaultTasks = Object.values(this.props.tasks).filter(task => task.listID === this.getList().id && task.sectionID === null).sort((a, b) => { return a.order - b.order })

        let sections = Object.values(this.getList().sections).sort((a, b) => { return a.order - b.order }).map(section =>
            <TaskSection
                key={section.id}
                tasks={this.getSectionTasks(section.id)}
                sectionID={section.id}
                sectionName={section.name}
                lists={this.props.lists}
                selectedList={this.props.selectedList}
                rootHandlers={this.props.rootHandlers}
                listHandlers={this.listHandlers}
                activeTask={this.state.activeTask}
                activeDate={this.state.activeDate}
            />
        )

        return (
            <div className="w-full h-full overflow-auto hide-scrollbar">
                <TaskSection
                    tasks={defaultTasks}
                    sectionID={null}
                    sectionName={null}
                    lists={this.props.lists}
                    selectedList={this.props.selectedList}
                    rootHandlers={this.props.rootHandlers}
                    listHandlers={this.listHandlers}
                    activeTask={this.state.activeTask}
                    activeDate={this.state.activeDate}
                />
                {sections}
            </div>
        );
    }
}

export default ListAll;