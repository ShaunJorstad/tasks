import React from 'react';

class Config extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameInput: this.props.lists[this.props.selectedList].name,
            validName: true,
            colorInput: this.getList().color,
            validColor: true
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedList != prevProps.selectedList) {
            this.setState({
                nameInput: this.getList().name,
                validName: true,
                colorInput: this.getList().color,
                validColor: true
            })
        }
    }

    getList() {
        return this.props.lists[this.props.selectedList]
    }

    processNameChange(val) {
        this.setState({
            nameInput: val
        })
        if (val.length == 0 || ['today', 'upcoming', 'all'].includes(val)) {
            this.setState({
                validName: false
            })
        } else {
            this.setState({
                validName: true
            })
            this.props.updateListName(val, this.getList().id)
        }
    }

    processColorChange(val) {
        this.setState({ 
            colorInput: val
        })
        if (!['green', 'blue', 'teal', 'pink', 'purple', 'orange'].includes(val)) {
            this.setState({
                validColor: false
            })
        } else {
            this.setState({
                validColor: true
            })
            this.props.updateListColor(val, this.getList().id)
        }
    }


    renderTitleInput() {
        return (
            <input
                className={`col-span-3 bg-lightGray px-2 py-2 rounded-lg ${this.state.validName ? '' : 'bg-lightRed text-red'}`}
                value={this.state.nameInput}
                onChange={val => { this.processNameChange(val.target.value) }}
                type='text' />)
    }

    renderColorInput() {
        return (
            <input
                className={`col-span-3 bg-lightGray px-2 py-2 rounded-lg text-${this.getList().color} ${this.state.validColor ? '' : 'bg-lightRed text-red'}`}
                value={this.state.colorInput}
                onChange={val => { this.processColorChange(val.target.value) }}
                type='text' />)
    }

    renderDeleteButton() {
        return (
            <div className="select-none cursor-pointer bg-lightRed text-red col-span-3 px-4 py-4 rounded-lg mt-48 flex justify-center" onClick={() => {this.props.deleteList(this.getList().id)}}>
                <p className="">delete</p>
            </div>
        )
    }

    render() {
        return (
            <div className="mt-20 w-3/5 grid grid-cols-4 gap-y-7">
                <div className="configLabel">
                    <p>Title</p>
                </div>
                {this.renderTitleInput()}
                <div className="configLabel">
                    <p>Color</p>
                </div>
                {this.renderColorInput()}
                <div></div>
                {this.renderDeleteButton()}
            </div>
        );
    }
}

export default Config;