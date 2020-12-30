import React from 'react';
import Task from './Task.js';

class TaskSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    getList() {
        return this.props.lists[this.props.selectedList]
    }

    renderSectionTitle() {
        return (this.props.sectionName !== null ?
            <input
                className={`col-span-11 text-sfMedium text-18 text-${this.getList().color}`}
                type='text'
                placeholder="section name"
                value={this.props.sectionName}
                onChange={val => { this.props.rootHandlers.editSection(this.getList().id, this.props.sectionID, { name: val.target.value }) }} /> : null)
    }

    renderDeleteButton() {
        return (this.props.sectionName !== null ?
            <div className="cursor-pointer flex justify-end">
                <div
                    onClick={() => {
                        this.props.rootHandlers.deleteSection(this.getList().id, this.props.sectionID)
                    }}
                    className={`mr-4 rounded-full w-5 h-5 border-2 border-gray mt-1 hover:bg-${this.getList().color} hover:border-${this.getList().color} sectionDeleteButton opacity-0 transition-all duration-200 ease-in-out transform hover:scale-75 motion-reduce:transform-none`}>
                </div>
            </div> : null)
    }

    renderAddTaskButton() {
        return (
            <div className="grid grid-cols-12">
                <div></div>
                <div className="col-span-11 w-full items-center cursor-pointer">
                    <p
                        className="select-none place-self-center text-center pl-2 pt-4 newListButton text-gray opacity-0 sectionTaskButton transition-all duration-200 ease-in-out"
                        onClick={() => { this.props.rootHandlers.createTask(this.getList().id, this.props.sectionID) }}
                    >+ Add Task</p>
                </div>
            </div>
        )
    }

    render() {
        let renderedTasks = this.props.tasks.map(task =>
            <Task
                key={task.id}
                lists={this.props.lists}
                selectedList={this.props.selectedList}
                task={task}
                rootHandlers={this.props.rootHandlers}
                listHandlers={this.props.listHandlers}
                activeTask={this.props.activeTask}
                activeDate={this.props.activeDate}
            />
        )

        return (
            <div className="w-full mb-16 section">
                <div className="w-full grid grid-cols-12 sectionHeader">
                    {this.renderDeleteButton()}
                    {this.renderSectionTitle()}
                </div>
                {renderedTasks}
                {this.renderAddTaskButton()}
            </div>
        );
    }
}

export default TaskSection;