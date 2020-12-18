import React from 'react';
import 'tailwindcss/tailwind.css';
import todayLogo from './icons/today.svg';
import allLogo from './icons/all.svg';
import upcomingLogo from './icons/upcoming.svg';
import flaggedLogo from './icons/flagged.svg';
import './index.css';

class Tile extends React.Component {
    constructor(props) {
        super(props);
    }

    renderIcon() {
        switch (this.props.icon) {
            case "today":
                return (
                    <img src={todayLogo} width="24" height="24" />
                );
            case "all":
                return (
                    <img src={allLogo} width="24" height="24" />
                );
            case "upcoming":
                return (
                    <img src={upcomingLogo} width="24" height="24" />
                );
            case "flagged":
                return (
                    <img src={flaggedLogo} width="24" height="24" />
                );
        }
    }

    renderTaskCount() {
        return (
            <div className={`${(this.props.activeList == this.props.title ? 'selectedTaskCount text-tileSelectedTitle' : 'unselectedTaskCount')}`}>
                <p>{this.props.taskCount}</p>
            </div>
        )
    }

    renderTitle() {
        return (
            <div className={`${(this.props.activeList == this.props.title ? 'selectedTitle text-tileSelectedTitle' : 'unselectedTitle text-tileUnselectedTitle')}`}>
                <p>{this.props.title}</p>
            </div>
        )
    }

    renderBackgroundColor() {
        if (this.props.activeList == this.props.title) {

            switch(this.props.title) {
                case "today":
                    return "bg-blue";
                case "all":
                    return "bg-gray";
                case "upcoming":
                    return "bg-red";
            }
        } else {
            return 'bg-tileUnselected';
        }
    }

    render() {
        return (
            <div
                id={this.props.title + "Tile"}
                className={`${this.renderBackgroundColor() + ' wh-tile rounded-lg'}`}
                onClick={() => { this.props.handler(this.props.title) }
                }>
                <div className="place-self-center grid grid-cols-2 py-2 px-2 justify-between gap-1">
                    {this.renderIcon()}
                    {this.renderTaskCount()}
                    {this.renderTitle()}
                </div>
            </div>
        );
    }
}


export default Tile