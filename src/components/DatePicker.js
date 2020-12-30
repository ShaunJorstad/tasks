import React from 'react';
import AnimateHeight from 'react-animate-height';

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bottomAlign: false
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
        this.MONTHS = {
            0: "January",
            1: "February",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December"
        }
        this.UpcomingMonths = {}
        let year = this.TODAY.getFullYear()
        let month = this.TODAY.getUTCMonth()
        this.UpcomingMonths[0] = [this.TODAY, (new Date(year, month + 1, 0).getDate())]
        for (let i = 0; i < 11; i++) {
            month += 1;
            if (month >= 12) {
                month = 0
                year += 1
            }
            let newDate = new Date(year, month)
            let daysInMonth = (new Date(year, month + 1, 0).getDate())
            this.UpcomingMonths[i + 1] = [newDate, daysInMonth]
        }
    }

    generateDateFromOffset(start, offset) {
        let date = new Date(start)
        date.setDate(start.getDate() + offset)
        return date
    }

    generateDateFromToday(dayOffset) {
        let date = new Date(this.TODAY)
        date.setDate(this.TODAY.getDate() + dayOffset)
        return date
    }

    calcDayDifference(day) {
        return Math.ceil((day.getTime() - this.TODAY.getTime()) / (1000 * 3600 * 24))
    }

    renderDate() {
        let dateString = "add date"
        if (this.props.task.due) {
            let parsedDate = this.props.task.due.toLocaleDateString("en-US").split("/")
            dateString = parsedDate[0] + "/" + parsedDate[1]
            let offset = this.calcDayDifference(this.props.task.due)
            if (offset >= 0) {
                if (offset === 0) {
                    dateString = "today"
                } else if (offset === 1) {
                    dateString = "tomorrow"
                } else if (offset < 7) {
                    dateString = this.DAY_OF_WEEK[this.props.task.due.getDay()]
                } else if (offset < 14) {
                    dateString = "next " + this.DAY_OF_WEEK[this.props.task.due.getDay()]
                }
            } else {
                dateString = offset + " days overdue"
            }
        }
        return (
            <div className={
                `select-none cursor-pointer  
                ${this.renderDateColor()}`
            }
                onClick={(e) => {
                    if (e.clientY > 350) {
                        this.setState({ bottomAlign: true })
                    } else {
                        this.setState({ bottomAlign: false })
                    }
                    let change = (this.props.activeDate === null ? this.props.task.id : null)
                    this.props.listHandlers.expandDate(change)
                }}
            >
                <span
                    className={`text-sfRegular text-14 rounded-md 
                    transition-all duration-200 ease-in-out 
                    dateButtonHover
                    `}
                >
                    {dateString}
                </span>
            </div>
        )

    }

    renderDateColor() {
        if (this.props.task.due) {
            let parsedDate = this.props.task.due.toLocaleDateString("en-US").split("/")
            let offset = this.calcDayDifference(this.props.task.due)
            if (offset >= 0) {
                if (offset === 0) {
                    return 'text-dateToday'
                } else if (offset === 1) {
                    return 'text-dateTomorrow'
                } else {
                    return 'text-dateFuture'
                }
            } else {
                return 'text-dateExpired'
            }
        } else {
            return ('text-dateUnselected')
        }
    }

    renderPicker() {
        let calMonths = [...Array(12).keys()].map(i =>
            <div className="">
                {i === 0 ?
                    <div className="w-full bg-white grid grid-cols-7 absolute top-36 z-50 text-sfLight text-13">
                        <div className="w-full text-center">S</div>
                        <div className="w-full text-center">M</div>
                        <div className="w-full text-center">T</div>
                        <div className="w-full text-center">W</div>
                        <div className="w-full text-center">T</div>
                        <div className="w-full text-center">F</div>
                        <div className="w-full text-center">S</div>
                        <hr className={`col-span-7 opacity-10`} />
                    </div> : null}
                <div className={`sticky bg-white top-0 text-15 font-bold pl-4 pb-1 text-sfRegular text-${this.props.listColor}`}>
                    {this.MONTHS[this.UpcomingMonths[i][0].getMonth()] + ' ' + this.UpcomingMonths[i][0].getFullYear()}
                </div>
                <div className={`py-6 grid grid-cols-7 gap-y-1`}>
                    <div className={`col-span-${this.UpcomingMonths[i][0].getDay()}`}></div>
                    {[...Array(this.UpcomingMonths[i][1] - (this.UpcomingMonths[i][0].getDate() - 1)).keys()].map(date =>
                        <div className={`
                        text-center text-sfLight text-13 select-none cursor-pointer py-1 rounded-md
                        hover:bg-lightGray
                        ${i === 0 && date === 0 ? `text-${this.props.listColor}` : null}`}
                            onClick={() => {
                                let newDate = this.generateDateFromOffset(this.UpcomingMonths[i][0], date)
                                this.props.rootHandlers.editTask(this.props.task.id, { due: newDate }, true)
                                this.props.listHandlers.expandDate(null)
                            }}>
                            {date + this.UpcomingMonths[i][0].getDate()}
                        </div>
                    )}
                </div>
            </div>
        )
        return (
            <div className={
                `absolute wh-datepicker rounded-xl z-50 ${this.state.bottomAlign? `bottom-0`: null}`
            }>
                <div className={`grid grid-cols-2 pt-3 px-4`}>
                    <div className={`flex flex-col`}>
                        <div className={
                            `text-dateQuickSelect select-none cursor-pointer 
                            hover:bg-lightGray transition-all duration-100 ease-in-out
                            py-1 px-2 rounded-md`
                        }
                            onClick={() => {
                                this.props.rootHandlers.editTask(this.props.task.id, { due: this.TODAY }, true)
                                this.props.listHandlers.expandDate(null)
                            }}
                        >
                            today
                        </div>
                        <div className={
                            `text-dateQuickSelect select-none cursor-pointer 
                            hover:bg-lightGray transition-all duration-100 ease-in-out
                            py-1 px-2 rounded-md`
                        }
                            onClick={() => {
                                this.props.rootHandlers.editTask(this.props.task.id, { due: this.generateDateFromToday(2) }, true)
                                this.props.listHandlers.expandDate(null)
                            }}>
                            later this week
                        </div>
                        <div className={
                            `text-dateQuickSelect select-none cursor-pointer 
                            hover:bg-lightGray transition-all duration-100 ease-in-out
                            py-1 px-2 rounded-md`
                        }
                            onClick={() => {
                                this.props.rootHandlers.editTask(this.props.task.id, { due: null }, true)
                                this.props.listHandlers.expandDate(null)
                            }}>
                            none
                        </div>
                    </div>
                    <div className={`flex flex-col align-end`}>
                        <div className={
                            `text-dateQuickSelect select-none cursor-pointer 
                            hover:bg-lightGray transition-all duration-100 ease-in-out
                            py-1 px-2 rounded-md`
                        }
                            onClick={() => {
                                this.props.rootHandlers.editTask(this.props.task.id, { due: this.generateDateFromToday(1) }, true)
                                this.props.listHandlers.expandDate(null)
                            }}>
                            tomorrow
                        </div>
                        <div className={
                            `text-dateQuickSelect select-none cursor-pointer 
                            hover:bg-lightGray transition-all duration-100 ease-in-out
                            py-1 px-2 rounded-md`
                        }
                            onClick={() => {
                                this.props.rootHandlers.editTask(this.props.task.id, { due: this.generateDateFromToday(7) }, true)
                                this.props.listHandlers.expandDate(null)
                            }}>
                            next week
                        </div>
                    </div>
                </div>
                <div id="calendar" className={`overflow-auto hide-scrollbar h-4/6 mt-4`}>
                    {calMonths}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className={
                `m-date`
            }>
                {this.renderDate()}
                {this.props.activeDate === this.props.task.id ? this.renderPicker() : null}
            </div>
        );
    }
}


export default DatePicker