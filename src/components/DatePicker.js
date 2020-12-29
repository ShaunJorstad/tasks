import React from 'react';
import AnimateHeight from 'react-animate-height';

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
        this.TODAY = new Date()
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

    calcDayDifference(day) {
        return Math.ceil((day.getTime() - this.TODAY.getTime()) / (1000 * 3600 * 24))
    }

    renderDate() {
        let dateString = "add date"
        if (this.props.task.due) {
            let parsedDate = this.props.task.due.toLocaleDateString("en-US").split("/")
            dateString = parsedDate[0] + "/" + parsedDate[1]
            console.log("date difference")
            let offset = this.calcDayDifference(this.props.task.due)
            if (offset >= 0) {
                if (offset === 0) {
                    dateString = "today"
                } else if (offset === 1) {
                    dateString = "tomorrow"
                } else if (offset < 7) {
                    dateString = this.DAY_OF_WEEK[this.props.task.due.getUTCDate()]
                }
            } else {
                dateString = offset + " days overdue"
            }
        }
        return (
            <div className={
                `select-none cursor-pointer ` +
                `text-darkGreen`
            }
                onClick={() => {
                    let change = !this.state.expanded
                    this.setState({
                        expanded: change
                    })
                }}
            >
                <span
                    className={`text-sfRegular text-14`}
                >
                    {dateString}
                </span>
            </div>
        )

    }

    renderPicker() {
        return (

            <div className={
                `absolute wh-datepicker rounded-xl z-50`
            }>
                <div className={`grid grid-cols-2 pt-3 px-4`}>
                    <div className={`flex flex-col`}>
                        <div className={
                            `text-dateQuickSelect select-none cursor-pointer 
                            hover:bg-lightGray transition-all duration-100 ease-in-out
                            py-1 px-2 rounded-md`
                        }
                            onClick={() => { 
                                this.props.rootHandlers.editTask(this.props.task.id, {due: new Date()}) 
                                this.setState({
                                    expanded: false
                                })
                            }}
                        >
                            today
                        </div>
                        <div className={
                            `text-dateQuickSelect select-none cursor-pointer 
                            hover:bg-lightGray transition-all duration-100 ease-in-out
                            py-1 px-2 rounded-md`
                        }>
                            later this week
                        </div>
                        <div className={
                            `text-dateQuickSelect select-none cursor-pointer 
                            hover:bg-lightGray transition-all duration-100 ease-in-out
                            py-1 px-2 rounded-md`
                        }>
                            none
                        </div>
                    </div>
                    <div className={`flex flex-col align-end`}>
                        <div className={
                            `text-dateQuickSelect select-none cursor-pointer 
                            hover:bg-lightGray transition-all duration-100 ease-in-out
                            py-1 px-2 rounded-md`
                        }>
                            tomorrow
                        </div>
                        <div className={
                            `text-dateQuickSelect select-none cursor-pointer 
                            hover:bg-lightGray transition-all duration-100 ease-in-out
                            py-1 px-2 rounded-md`
                        }>
                            next week
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    render() {
        return (
            <div className={
                ``
            }>
                {this.renderDate()}
                {this.state.expanded ? this.renderPicker() : null}
            </div>
        );
    }
}


export default DatePicker