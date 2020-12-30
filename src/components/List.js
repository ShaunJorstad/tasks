import React from 'react';
import Task from './Task.js';
import TaskSection from './TaskSection.js';

class List extends React.Component {
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
        this.DAY_OF_WEEK = {
            0: "sunday",
            1: "monday",
            2: "tuesday",
            3: "wednesday",
            4: "thursday",
            5: "friday",
            6: "saturday"
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

    getSectionTasks(sectionID, dueOffset = null) {
        if (dueOffset === null) {
            return Object.values(this.props.tasks).filter(task => task.sectionID === sectionID).sort((a, b) => { return a.order - b.order })
        } else {
            return Object.values(this.props.tasks).filter(task => task.sectionID === sectionID && task.due !== null && this.calcDayDifference(task.due) === 0).sort((a, b) => { return a.order - b.order })
        }
    }

    getListTasks(listID, dueOffset = null) {
        if (dueOffset === null) {
            return Object.values(this.props.tasks).filter(task => task.listID === listID).sort((a, b) => { return a.order - b.order })
        } else {
            return Object.values(this.props.tasks).filter(task => task.listID === listID && task.due !== null && this.calcDayDifference(task.due) <= dueOffset).sort((a, b) => { return a.order - b.order })
        }
    }

    getDateTasks(dueOffset) {
        return Object.values(this.props.tasks).filter(task => task.listID === this.getList().id && task.due !== null && this.calcDayDifference(task.due) === dueOffset).sort((a, b) => { return a.order - b.order })
    }

    getUpcomingName(dueOffset) {
        let today = new Date().getDay()
        today += dueOffset
        today %= 7
        return this.DAY_OF_WEEK[today]
    }

    renderAddSectionButton() {
        return (
            <div className="grid grid-cols-12">
                <div></div>
                <div className="col-span-11 w-full items-center cursor-pointer">
                    <p
                        className="select-none place-self-center text-center pl-2 pt-4 newListButton text-gray"
                        onClick={() => { this.props.rootHandlers.createSection(this.getList().id) }}
                    >+ Add Section</p>
                </div>

            </div>
        )
    }

    renderAll() {
        let defaultTasks = Object.values(this.props.tasks).filter(task => task.listID === this.getList().id && task.sectionID === null).sort((a, b) => { return a.order - b.order })

        let sections = Object.values(this.getList().sections).sort((a, b) => { return a.order - b.order }).map(section =>
            <TaskSection
                key={section.id}
                filter={this.props.filter}
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
                    filter={this.props.filter}
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
                {this.renderAddSectionButton()}
            </div>
        );
    }

    calcDayDifference(day) {
        return Math.ceil((day.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24))
    }

    renderToday() {
        let defaultTasks = Object.values(this.props.tasks).filter(task => task.listID === this.getList().id && task.sectionID === null && task.due !== null && this.calcDayDifference(task.due) === 0).sort((a, b) => { return a.order - b.order })


        let sections = Object.values(this.getList().sections).sort((a, b) => { return a.order - b.order }).map(section =>
            <TaskSection
                key={section.id}
                filter={this.props.filter}
                tasks={this.getSectionTasks(section.id, 0)}
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
                    filter={this.props.filter}
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
                {this.renderAddSectionButton()}
            </div>
        );
    }

    renderUpcoming() {
        let days = [...Array(7).keys()].map(index =>
            <TaskSection
                key={index}
                filter={this.props.filter}
                tasks={this.getDateTasks(index)}
                sectionID={null}
                sectionName={this.getUpcomingName(index)}
                offset={index}
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
                {days}
            </div>
        );
    }

    renderGlobalAll() {
        let lists = Object.values(this.props.lists).sort((a, b) => { return a.order - b.order }).map(list => {
            let tasks = this.getListTasks(list.id)
            if (tasks.length > 0) {
                return <TaskSection
                    key={list.id}
                    filter={this.props.filter}
                    tasks={tasks}
                    sectionID={list.id}
                    listID={list.id}
                    sectionName={list.name}
                    lists={this.props.lists}
                    selectedList={this.props.selectedList}
                    rootHandlers={this.props.rootHandlers}
                    listHandlers={this.listHandlers}
                    activeTask={this.state.activeTask}
                    activeDate={this.state.activeDate}
                />
            }
        })

        return (
            <div className="w-full h-full overflow-auto hide-scrollbar">
                {lists}
            </div>
        );
    }
    renderGlobalUpcoming() {
        let lists = Object.values(this.props.lists).sort((a, b) => { return a.order - b.order }).map(list => {
            let tasks = this.getListTasks(list.id, 7)
            if (tasks.length > 0) {
                return <TaskSection
                    key={list.id}
                    filter={this.props.filter}
                    tasks={tasks}
                    sectionID={list.id}
                    listID={list.id}
                    sectionName={list.name}
                    lists={this.props.lists}
                    selectedList={this.props.selectedList}
                    rootHandlers={this.props.rootHandlers}
                    listHandlers={this.listHandlers}
                    activeTask={this.state.activeTask}
                    activeDate={this.state.activeDate}
                />
            }
        })

        return (
            <div className="w-full h-full overflow-auto hide-scrollbar">
                {lists}
            </div>
        );
    }
    renderGlobalToday() {
        let lists = Object.values(this.props.lists).sort((a, b) => { return a.order - b.order }).map(list => {
            let tasks = this.getListTasks(list.id, 0)
            if (tasks.length > 0) {
                return <TaskSection
                    key={list.id}
                    filter={this.props.filter}
                    tasks={tasks}
                    sectionID={list.id}
                    listID={list.id}
                    sectionName={list.name}
                    lists={this.props.lists}
                    selectedList={this.props.selectedList}
                    rootHandlers={this.props.rootHandlers}
                    listHandlers={this.listHandlers}
                    activeTask={this.state.activeTask}
                    activeDate={this.state.activeDate}
                />
            }
        })

        return (
            <div className="w-full h-full overflow-auto hide-scrollbar">
                {lists}
            </div>
        );
    }

    render() {
        switch (this.props.selectedList) {
            case ("all"):
                return (this.renderGlobalAll())
            case ("upcoming"):
                return (this.renderGlobalUpcoming())
            case ("today"):
                return (this.renderGlobalToday())
            default:
                switch (this.props.filter) {
                    case ("all"):
                        return (this.renderAll())
                    case ("today"):
                        return (this.renderToday())
                    case ("upcoming"):
                        return (this.renderUpcoming())
                    default:
                        break
                }
        }
    }
}

export default List;