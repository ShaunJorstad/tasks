import React from 'react';

class InputField extends React.Component {
    constructor(props) {
        super(props)
        this.state ={

        }
    }


    render() {
        return (
            <input
                className={`
                    text-sfLight text-19 bg-lightGray py-2 px-3 rounded-md border-gray border-opacity-20
                `}
                type={this.props.type}
                value={this.props.data[this.props.field]}
                placeholder={this.props.field}
                onChange={val => {
                    this.props.editFields(this.props.page, this.props.field, val.target.value)
                }}
            />
        )
    }
}

export default InputField