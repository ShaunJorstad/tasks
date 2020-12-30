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

    getList(listID = null) {
        if (listID !== null) {
            return this.props.lists[listID]
        }
        if (['all', 'today', 'upcoming'].includes(this.props.selectedList)) {
            return { color: 'blue' }
        }
        console.log(this.props.selectedList)
        return this.props.lists[this.props.selectedList]
    }

    renderCheckCircle() {
        return (
            <div className="cursor-pointer" >
                <div
                    onClick={() => {
                        this.props.rootHandlers.completeTask(this.props.task.id)
                    }}
                    className={`taskCheckCircle rounded-full w-5 h-5 border-2 mt-1 hover:bg-${this.getList(this.props.task.listID).color} hover:border-${this.getList(this.props.task.listID).color} transition-all duration-200 ease-in-out transform hover:scale-75 motion-reduce:transform-none
                    ${this.props.deleteHover ? `scale-75 bg-${this.getList().color} border-${this.getList().color} ` : `border-gray`}`}>
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
                onClick={() => { this.props.listHandlers.selectNewTask(this.props.task.id) }}
                onChange={val => { this.props.rootHandlers.editTask(this.props.task.id, { content: val.target.value }) }} />
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
                        onChange={val => { this.props.rootHandlers.editTask(this.props.task.id, { notes: val.target.value }) }} />
                </AnimateHeight>
            </div>

        )
    }

    renderDate() {
        return (
            <div className={`col-span-11`}>
                {/* <AnimateHeight
                    duration={500}
                    height={this.props.activeTask === this.props.task.id ? 'auto' : '0'}
                > */}
                <DatePicker
                    task={this.props.task}
                    listColor={this.getList().color}
                    activeTask={this.props.activeTask}
                    activeDate={this.props.activeDate}
                    listHandlers={this.props.listHandlers}
                    rootHandlers={this.props.rootHandlers}
                />
                {/* </AnimateHeight> */}
            </div>
        )
    }


    render() {
        return (
            <div
                className="grid grid-cols-12 w-full gap-y-2"
            >
                {this.renderCheckCircle()}
                {this.renderTaskContent()}
                <div className="h-0"></div>
                {this.renderNotes()}
                <div className="h-0"></div>
                {this.renderDate()}
                <div className="h-0"></div>
                <hr className={`
                    col-span-11 opacity-10 mb-2 mt-1
                    ${this.props.activeTask === this.props.task.id ? '' : 'mt-03'}
                `} />
            </div>
        );
    }
}

export default Task;