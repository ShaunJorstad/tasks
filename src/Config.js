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
        if (this.props.selectedList != prevProps.selectedList && !['today', 'all', 'upcoming'].includes(this.props.selectedList)) {
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
            this.props.rootHandlers.editList(this.getList().id, {name: val})
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
            this.props.rootHandlers.editList(this.getList().id, {color: val})
        }
    }

    renderColorOptions() {
        return (
            <div className="col-span-3 grid grid-cols-6 ">
                <div className="h-10 w-10 rounded-lg bg-pink transition-all duration-300 ease-in-out transform hover:scale-125"
                    onClick={() => { this.processColorChange('pink') }}></div>
                <div className="h-10 w-10 rounded-lg bg-blue transition-all duration-300 ease-in-out transform hover:scale-125"
                    onClick={() => { this.processColorChange('blue') }}></div>
                <div className="h-10 w-10 rounded-lg bg-purple transition-all duration-300 ease-in-out transform hover:scale-125"
                    onClick={() => { this.processColorChange('purple') }}></div>
                <div className="h-10 w-10 rounded-lg bg-orange transition-all duration-300 ease-in-out transform hover:scale-125"
                    onClick={() => { this.processColorChange('orange') }}></div>
                <div className="h-10 w-10 rounded-lg bg-teal transition-all duration-300 ease-in-out transform hover:scale-125"
                    onClick={() => { this.processColorChange('teal') }}></div>
                <div className="h-10 w-10 rounded-lg bg-green transition-all duration-300 ease-in-out transform hover:scale-125"
                    onClick={() => { this.processColorChange('green') }}></div>
            </div>
        )
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
            <div className="select-none cursor-pointer bg-lightRed text-red col-span-3 px-4 py-4 rounded-lg mt-48 flex justify-center" onClick={() => { this.props.rootHandlers.deleteList(this.getList().id) }}>
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
                {/* {this.renderColorInput()} */}
                {this.renderColorOptions()}
                <div></div>
                {this.renderDeleteButton()}
            </div>
        );
    }
}

export default Config;