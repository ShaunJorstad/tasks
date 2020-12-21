import React from 'react';

class ContentHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        // console.log(this.props.lists[this.props.selectedList])
    }

    getList() {
        return this.props.lists[this.props.selectedList]
    }

    renderTitle() {
        return (
            <p className="listTitle text-blue">{this.getList().name}</p>
        );
    }

    render() {
        if (typeof this.props.lists === 'undefined') {
            return (<div></div>);
        }
        return (
            <div className="mt-7">
                {this.renderTitle()}
            </div>
        );
    }
}

export default ContentHeader;