import React from 'react';
import 'tailwindcss/tailwind.css';
import './index.css';
import blueLogo from './icons/listIcons/blue.svg';
import greenLogo from './icons/listIcons/green.svg';
import orangeLogo from './icons/listIcons/orange.svg';
import pinkLogo from './icons/listIcons/pink.svg';
import purpleLogo from './icons/listIcons/purple.svg';
import tealLogo from './icons/listIcons/teal.svg';

class ListTile extends React.Component {

    isSelected() {
        return this.props.selectedList === this.props.list.id
    }

    renderTitle() {
        return (
            <div className={`col-span-6 whitespace-nowrap select-none overflow:hidden list ${(this.isSelected() ? 'text-white' :'text-gray')}`} >
                <p className="align-middle">{this.props.list.name}</p>
            </div>
        )
    }

    renderIcon() {
        switch (this.props.list.color) {
            case "purple":
                return (
                    <div className="">
                        <img src={purpleLogo} width="24" height="24" alt="purple" />
                    </div>
                );
            case "pink":
                return (
                    <div className="">
                        <img src={pinkLogo} width="24" height="24" alt="pink" />
                    </div>
                );
            case "orange":
                return (
                    <div className="">
                        <img src={orangeLogo} width="24" height="24" alt="orange" />
                    </div>
                );
            case "green":
                return (
                    <div className="">
                        <img src={greenLogo} width="24" height="24" alt="teal" />
                    </div>
                );
            case "teal":
                return (
                    <div className="">
                        <img src={tealLogo} width="24" height="24" alt="teal" />
                    </div>
                );
            case "blue":
                return (
                    <div className="">
                        <img src={blueLogo} width="24" height="24" alt="blue" />
                    </div>
                );
            default:
                return;
        }
    }

    renderTaskCount() {
        return (
            <p className={`text-right select-none px-2 list ${(this.isSelected() ? 'text-white' :'text-gray')}`}>{this.props.list.taskCount}</p>
        );
    }

    renderBackground() {
        if (this.isSelected()) {
            return ("bg-lightBlue py-2 rounded-lg")
        }
    }

    render() {
        return (
            <div
                className={`py-1 select-none transition-all duration-200 ease-in-out ${this.renderBackground()}`}
                onClick={() => {this.props.selectNewList(this.props.list.id)}}>
                <div className="grid grid-cols-8 auto-cols-min pl-2">
                    {this.renderIcon()}
                    {this.renderTitle()}
                    {this.renderTaskCount()}
                </div>
            </div>
        )
    }
}

export default ListTile