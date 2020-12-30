import React from 'react';
import Task from './Task.js';

class TaskSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteHover: false
        }
    }

    getList() {
        return this.props.lists[this.props.selectedList]
    }

    renderSectionTitle() {
        if (this.props.filter !== "upcoming") {
            return (this.props.sectionName !== null ?
                <input
                    className={`col-span-11 text-sfMedium text-18 text-${this.getList().color}`}
                    type='text'
                    placeholder="section name"
                    value={this.props.sectionName}
                    onChange={val => { this.props.rootHandlers.editSection(this.getList().id, this.props.sectionID, { name: val.target.value }) }} /> : null)
        }
        return (this.props.sectionName !== null ?
            <p
                className={`select-none cursor-pointer col-span-11 text-sfMedium text-18 text-${this.getList().color}`}
            >{this.props.sectionName}</p> : null)
    }

    renderDeleteButton() {
        return (this.props.sectionName !== null && this.props.filter !== 'today' ?
            <div className="cursor-pointer flex justify-end">
                <div
                    onClick={() => {
                        if (this.props.filter === "today") {
                            this.props.rootHandlers.deleteSection(this.getList().id, this.props.sectionID)
                        } else {
                            this.props.rootHandlers.batchDeleteTasks(this.props.tasks.map(task => task.id)) 
                        }
                    }}
                    onMouseOver={() => {
                        this.setState({ deleteHover: true })
                    }}
                    onMouseOut={() => {
                        this.setState({ deleteHover: false })
                    }}
                    className={`sectionDeleteButton mr-4 rounded-full w-5 h-5 border-2 border-gray mt-1 
                    ${this.props.filter === "upcoming" ? null : `hover:bg-${this.getList().color} hover:border-${this.getList().color}   transform hover:scale-75 motion-reduce:transform-none`} opacity-0 transition-all duration-200 ease-in-out`}>
                </div>
            </div> : <div className=""></div>)
    }

    generateDateFromToday(dayOffset) {
        let today = new Date()
        let date = new Date(today)
        date.setDate(today.getDate() + dayOffset)
        return date
    }

    renderAddTaskButton() {
        return (
            <div
                className={`
                    grid grid-cols-12 py-8 cursor-pointer text-gray hover:text-${this.getList().color}
                    transition-all duration-75 ease-in-out
                `}
                onClick={() => {
                    switch (this.props.filter) {
                        case ("all"):
                            this.props.rootHandlers.createTask(this.getList().id, this.props.sectionID)
                            break
                        case ("today"):
                            this.props.rootHandlers.createTask(
                                this.getList().id,
                                this.props.sectionID,
                                new Date())
                            break
                        case ("upcoming"):
                            this.props.rootHandlers.createTask(
                                this.getList().id,
                                null,
                                this.generateDateFromToday(this.props.offset))
                            break
                        default:
                            break
                    }
                }}>
                <div></div>
                <div className="col-span-11 w-full items-center cursor-pointer">
                    <p
                        className={`select-none place-self-center text-center pl-2 pt-4 newListButton opacity-0 sectionTaskButton transition-all duration-200 ease-in-out`}

                    >+ Add Task</p>
                </div>
            </div>
        )
    }

    render() {
        let renderedTasksWithDates = this.props.tasks.filter(task => task.due !== null).sort((a, b) => { return a.due.getTime() - b.due.getTime() }).map(task =>
            <Task
                key={task.id}
                lists={this.props.lists}
                selectedList={this.props.selectedList}
                task={task}
                deleteHover={this.state.deleteHover}
                rootHandlers={this.props.rootHandlers}
                listHandlers={this.props.listHandlers}
                activeTask={this.props.activeTask}
                activeDate={this.props.activeDate}
            />
        )

        let renderedTasksWithoutDates = this.props.tasks.filter(task => task.due === null).sort((a, b) => { return a.order - b.order }).map(task =>
            <Task
                key={task.id}
                lists={this.props.lists}
                selectedList={this.props.selectedList}
                task={task}
                deleteHover={this.state.deleteHover}
                rootHandlers={this.props.rootHandlers}
                listHandlers={this.props.listHandlers}
                activeTask={this.props.activeTask}
                activeDate={this.props.activeDate}
            />
        )

        return (
            <div className="w-full section">
                <div className="sticky top-0 bg-white z-50 w-full grid grid-cols-12 sectionHeader">
                    {this.renderDeleteButton()}
                    {this.renderSectionTitle()}
                </div>
                {renderedTasksWithDates}
                {renderedTasksWithoutDates}
                {this.renderAddTaskButton()}
            </div>
        );
    }
}

export default TaskSection;