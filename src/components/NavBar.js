import React from 'react';
import 'tailwindcss/tailwind.css';
import Tile from './Tile.js';
import ListTile from './ListTile.js';
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    let listTiles = Object.values(this.props.lists).sort((a, b) => { return a.order - b.order }).map(list =>
      <ListTile
        list={list}
        lists={this.props.lists}
        tasks={this.props.tasks}
        selectedList={this.props.selectedList}
        rootHandlers={this.props.rootHandlers}
      />)

    return (
      <div className="bg-navBackground h-full w-372 transition-all duration-700 ease-in-out dynamicNav">
        <div className="px-2 h-full">
          <input className="w-full mt-9 py-1 bg-tileUnselected border-tileUnselectedBorder border-2 px-3 rounded-md text-sm" type="text" id="searchBar" placeholder="search"></input>
          <div className="grid mt-5 grid-cols-2 gap-x-3 gap-y-3">
            {/* <Tile
              title="today"
              icon="today"
              taskCount='40'
              selectedList={this.props.selectedList}
              selectNewList={this.props.selectNewList} />
            <Tile
              title="upcoming"
              icon="upcoming"
              taskCount='40'
              selectedList={this.props.selectedList}
              selectNewList={this.props.selectNewList} />
            <Tile
              title="all"
              icon="all"
              taskCount='40'
              selectedList={this.props.selectedList}
              selectNewList={this.props.selectNewList} /> */}
          </div>

          <div className="mt-10 h-lists">
            {listTiles}
          </div>
          <div className="flex items-center cursor-pointer">
            <p
              className="select-none place-self-center text-center pl-2 pt-4 newListButton text-gray"
              onClick={() => { this.props.rootHandlers.createList() }}
            >+ Add List</p>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;