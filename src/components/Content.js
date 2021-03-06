import React from 'react';
import ContentHeader from './ContentHeader';
import Config from '../Config.js';
import List from './List.js';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      view: 'list'
    }
    this.updateFilter = this.updateFilter.bind(this);
    this.updateView = this.updateView.bind(this);
    this.contentHandlers = {
      updateFilter: this.updateFilter,
      updateView: this.updateView
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedList !== this.props.selectedList && ['today', 'all', 'upcoming'].includes(this.props.selectedList)) {
      this.setState({
        filter: 'all',
        view: 'list'
      })
    }
  }

  updateFilter(newFilter) {
    if (this.state.view === 'config') {
      this.setState({ filter: newFilter, view: 'list' })
    } else {
      this.setState({ filter: newFilter });
    }
  }

  updateView(newView) {
    this.setState({ view: newView });
  }

  renderContents() {
    switch (this.state.view) {
      case "config":
        return (
          <Config
            lists={this.props.lists}
            tasks={this.props.tasks}
            selectedList={this.props.selectedList}
            rootHandlers={this.props.rootHandlers}
          />
        );
      case "list":
        return <List
              lists={this.props.lists}
              tasks={this.props.tasks}
              filter={this.state.filter}
              selectedList={this.props.selectedList}
              rootHandlers={this.props.rootHandlers}
            />
      case "calendar":
        return ('future feature')
      default:
        return 'error'
    }
  }

  render() {
    return (
      <div className="bg-blue-200 h-full w-full bg-contentBackground">
        <div className="mx-4 w-9/10 h-full">
          <ContentHeader
            lists={this.props.lists}
            tasks={this.props.tasks}
            selectedList={this.props.selectedList}
            filter={this.state.filter}
            view={this.state.view}
            contentHandlers={this.contentHandlers}
            rootHandlers={this.props.rootHandlers}
          />
          <div className="h-5/6">
            {this.renderContents()}
          </div>
        </div>
      </div>
    );
  }
}

export default Content;