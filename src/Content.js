import React from 'react';
import ContentHeader from './ContentHeader';

class Content extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    if (Object.values(this.props.lists).length === 0) {
      return (
        <div></div>
      );
    }

    return (
      <div className="bg-blue-200 h-full w-full">
        <div className="mx-4 w-9/10 h-full">
          <ContentHeader lists={this.props.lists} selectedList={this.props.selectedList}/>
        </div>
      </div>
    );
  }
}

export default Content;