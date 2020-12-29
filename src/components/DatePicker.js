import React from 'react';

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    renderDate() {
        return (
            <div className={
                `select-none cursor-pointer`
            }
                onClick={() => {
                    let change = !this.state.expanded
                    this.setState({
                        expanded: change
                    })
                }}
            >
                date
            </div>
        )

    }

    renderPicker() {
        return (
            <div className={`
                absolute wh-datepicker rounded-xl z-50
            `}>
                {/* date picker */}
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