import React from 'react';

class ContentHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    getList() {
        return this.props.lists[this.props.selectedList]
    }

    getGlobalTitleColor() {
        switch (this.props.selectedList) {
            case ("all"):
                return 'gray'
            case ("upcoming"):
                return 'red'
            case ("today"):
                return "blue"
            default:
                break;
        }
    }

    calcDayDifference(day) {
        return Math.ceil((day.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24))
    }

    getTodayCount() {
        return Object.values(this.props.tasks).filter(task => task.due !== null && this.calcDayDifference(task.due) === 0).length
    }

    renderTitle() {
        if (['all', 'upcoming', 'today'].includes(this.props.selectedList)) {
            return (<p className={`col-span-2 listTitle text-${this.getGlobalTitleColor()} select-none`}>{this.props.selectedList}</p>)
        }
        return (
            <p className={`col-span-2 listTitle text-${this.getList().color} select-none`}>{this.getList().name}</p>
        );
    }

    renderTaskCount() {
        if (['all', 'upcoming', 'today'].includes(this.props.selectedList)) {
            return (
                <div className="inline-block align-middle mt-2 align-right place-self-end pr-3">
                    <p className={`inline-block align-middle select-none text-right taskCount text-${this.getGlobalTitleColor()}`}>
                        {this.getTodayCount()}
                    </p>
                </div>)
        }
        return (
            <div className="inline-block align-middle mt-2 align-right place-self-end pr-3">
                {/* {this.props.view === "list" ?
                    <p
                        className="inline-block align-middle cursor-pointer select-none text-right addTaskButton text-gray pr-2"
                        onClick={() => { this.props.listHandlers.selectNewTask(this.props.rootHandlers.createTask(this.getList().id, null)) }}>+</p> :
                    <div></div>} */}
                <div></div>
                <p className={`inline-block align-middle select-none text-right taskCount text-${this.getList().color}`}>
                    {Object.values(this.props.tasks).filter(task => task.listID === this.getList().id).length}
                </p>
            </div>)
    }

    renderFilterBackground(currentFilter) {
        if (this.props.filter === currentFilter) {
            return (`bg-${this.getList().color} text-white`)
        }
    }

    renderViewBackground(currentView) {
        if (this.props.view === currentView) {
            return (`bg-${this.getList().color} text-white`)
        }
    }

    render() {
        if (typeof this.props.lists === 'undefined') {
            return (<div></div>);
        }
        return (
            <div className="mt-7 grid grid-cols-7">
                {this.renderTitle()}
                {!["all", "upcoming", "today"].includes(this.props.selectedList) ?
                    <div className="col-span-4 grid grid-cols-2 gap-x-2 ">
                        <div id="filterControls" className="inline-block justify-self-end mr-3  mt-2">
                            <div
                                className={`${this.renderFilterBackground('all')} inline-block align-middle px-2 select-none py-1 rounded-md transition-all: duration-150 ease-in-out cursor-pointer text-gray control`}
                                onClick={() => { this.props.contentHandlers.updateFilter('all') }}>
                                All</div>
                            <div
                                className={`${this.renderFilterBackground('today')} inline-block align-middle px-2 select-none py-1 rounded-md transition-all: duration-150 ease-in-out cursor-pointer text-gray control`}
                                onClick={() => { this.props.contentHandlers.updateFilter('today') }}>
                                Today</div>
                            <div
                                className={`${this.renderFilterBackground('upcoming')} inline-block align-middle px-2 select-none py-1 rounded-md transition-all: duration-150 ease-in-out cursor-pointer text-gray control`}
                                onClick={() => { this.props.contentHandlers.updateFilter('upcoming') }}>
                                Upcoming</div>
                        </div>
                        <div id="viewControls" className="inline-block align-middle mt-2">
                            <div
                                className={`${this.renderViewBackground('config')} inline-block align-middle px-2 select-none py-1 rounded-md transition-all: duration-150 ease-in-out cursor-pointer text-gray control`}
                                onClick={() => { this.props.contentHandlers.updateView('config') }}>
                                config</div>
                            <div
                                className={`${this.renderViewBackground('list')} inline-block align-middle px-2 select-none py-1 rounded-md transition-all: duration-150 ease-in-out cursor-pointer text-gray control`}
                                onClick={() => { this.props.contentHandlers.updateView('list') }}>
                                list</div>
                            <div
                                className={`${this.renderViewBackground('calendar')} inline-block align-middle px-2 select-none py-1 rounded-md transition-all: duration-150 ease-in-out cursor-pointer text-gray control`}
                                onClick={() => { this.props.contentHandlers.updateView('calendar') }}>
                                calendar</div>
                        </div>
                    </div> : <div className="col-span-4"></div>}
                {this.renderTaskCount()}
            </div>
        );
    }
}

export default ContentHeader;