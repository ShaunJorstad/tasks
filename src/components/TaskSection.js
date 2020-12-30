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
            <div className={`
                text-sfMedium text-18 text-${this.getList().color}
            `}>
                {this.props.sectionName}
            </div> : null)
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
            <div className="w-full mb-16">
                {this.renderSectionTitle()} 
                {renderedTasks}
            </div>
        );
    }
}

export default TaskSection;