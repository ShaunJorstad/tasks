import React from 'react';
import AnimateHeight from 'react-animate-height';
import DatePicker from './DatePicker.js';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textBoxHeight: 'auto'
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeTask === prevProps.task.id && this.props.activeTask !== this.props.task.id) {
            this.props.rootHandlers.editTask(this.props.task.id, {}, true)
        }
    }

    getList() {
        return this.props.lists[this.props.selectedList]
    }

    renderCheckCircle() {
        return (
            <div className="cursor-pointer" onClick={() => {
                this.props.rootHandlers.completeTask(this.props.task.id)
            }}>
                <div className="rounded-full w-5 h-5 border-2 border-gray mt-1">
                </div>
            </div>
        )
    }

    renderTaskContent() {
        return (
            <input
                className="col-span-11 text-sfRegular text-14"
                type='text'
                placeholder="task content"
                value={this.props.task.content}
                onChange={val => { this.props.rootHandlers.editTask(this.props.task.id, {content: val.target.value}) }} />
        )
    }

    renderNotes() {
        return (
            <div className={`col-span-11 `}>
                <AnimateHeight
                    duration={500}
                    height={this.props.activeTask === this.props.task.id ? 'auto' : '0'}
                >
                    <textarea
                        className={`
                            w-full text-sfRegular text-13 transition-all duration-700 ease-in-out
                            opacity-50
                        `}
                        type='text'
                        placeholder="notes"
                        value={this.props.task.notes}
                        onChange={val => { this.props.rootHandlers.editTask(this.props.task.id, {notes: val.target.value}) }} />
                </AnimateHeight>
            </div>

        )
    }

    renderDate() {
        return (
            <div className={`col-span-11`}>
                <AnimateHeight
                    duration={500}
                    height={this.props.activeTask === this.props.task.id ? 'auto' : '0'}
                >
                    {/* <DatePicker/> */}
                    date
                </AnimateHeight>
            </div>
        )
    }


    render() {
        return (
            <div
                className="grid grid-cols-12 w-full gap-y-2"
                onClick={() => { this.props.selectNewTask(this.props.task.id) }}>
                {this.renderCheckCircle()}
                {this.renderTaskContent()}
                <div className="h-0"></div>
                {this.renderNotes()}
                <div className="h-0"></div>
                {this.renderDate()}
                <div className="h-0"></div>
                <hr className={`
                    col-span-11 opacity-10 mb-2
                    ${this.props.activeTask === this.props.task.id ? '' : 'mt-03'}
                `} />
            </div>
        );
    }
}

export default Task;