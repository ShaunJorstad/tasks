import React from 'react';
import ContentHeader from './ContentHeader';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      view: 'list'
    }
    this.updateFilter = this.updateFilter.bind(this);
    this.updateView = this.updateView.bind(this);
  }

  updateFilter(newFilter) {
    this.setState({ filter: newFilter });
  }

  updateView(newView) {
    this.setState({ view: newView });
  }

  renderContents() {
    switch(this.state.view) {
      case "config": 
        return ('config');
      case "list":
        switch(this.state.filter) {
          case "all":
            return ('all')
          case 'today':
            return ('today')
          case 'upcoming':
            return ('upcoming')
          default:
            return 'error'
        }
        return ('list'); 
      case "calendar":
        return ('calendar')
      default:
        return 'error'
    }
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
          <ContentHeader
            lists={this.props.lists}
            selectedList={this.props.selectedList}
            filter={this.state.filter}
            view={this.state.view}
            updateFilter={this.updateFilter}
            updateView={this.updateView} />
          <div>
            {this.renderContents()} 
          </div>
        </div>
      </div>
    );
  }
}

export default Content;