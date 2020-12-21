import React from 'react';
import 'tailwindcss/tailwind.css';
import './index.css';
import blueLogo from './icons/listIcons/blue.svg';

class ListTile extends React.Component {

    isSelected() {
        return this.props.selectedList === this.props.list.id
    }

    renderTitle() {
        return (
            <div className={`col-span-6 whitespace-nowrap select-none overflow-scroll list ${(this.isSelected() ? 'text-white' :'text-gray')}`} >
                <p className="align-middle">{this.props.list.name}</p>
            </div>
        )
    }

    renderIcon() {
        switch (this.props.list.color) {
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