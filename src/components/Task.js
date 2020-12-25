import React from 'react';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeTask === prevProps.task.id && this.props.activeTask !== this.props.task.id) {
            this.props.editTask(this.getList().id, 'default', this.props.task.id, null, true)
        }
    }

    getList() {
        return this.props.lists[this.props.selectedList]
    }

    renderCheckCircle() {
        return (
            <div className="cursor-pointer" onClick={() => {
                this.props.completeTask(this.getList().id, 'default', this.props.task.id)
            }}>
                <div className="rounded-full w-5 h-5 border-2 border-gray mt-1">
                </div>
            </div>
        )
    }

    renderTaskContent() {
        return (
            <input
                className="col-span-11"
                type='text'
                value={this.props.content}
                onChange={val => { this.props.editTask(this.getList().id, 'default', this.props.task.id, { content: val.target.value }) }} />
        )
    }

    renderNotes() {
        if (this.props.activeTask == this.props.task.id) {
            return (<div>notes</div>)
        }
        return (
            <div></div>
        )
    }

    renderDate() {
        if (this.props.activeTask == this.props.task.id) {
            return (<div>date</div>)
        }
        return (
            <div></div>
        )
    }

    render() {
        return (
            <div
                className="grid grid-cols-12 w-full"
                onClick={() => { this.props.selectNewTask(this.props.id) }}>
                {this.renderCheckCircle()}
                {this.renderTaskContent()}
                {this.renderNotes()}
                {this.renderDate()}
            </div>
        );
    }
}

export default Task;