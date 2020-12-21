import React from 'react';
import 'tailwindcss/tailwind.css';
import Tile from './Tile.js';
import { db } from './FirebaseConfig';
import ListTile from './ListTile.js';
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todayTasks: 5,
      upcomingTasks: 10,
      allTasks: 15,
      flaggedTasks: 30
    }
  }

  render() {
    let listTiles = Object.values(this.props.lists).map(list =>
      <ListTile
        key={list.id}
        list={list}
        selectedList={this.props.selectedList}
        selectNewList={this.props.selectNewList} />)

    return (
      <div className="bg-navBackground h-full w-372">
        <div className="px-2 h-full">
          <input className="w-full mt-9 py-1 bg-tileUnselected border-tileUnselectedBorder border-2 px-3 rounded-md text-sm" type="text" id="searchBar" placeholder="search"></input>
          <div className="grid mt-5 grid-cols-2 gap-x-3 gap-y-3">
            <Tile
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
              selectNewList={this.props.selectNewList} />
          </div>

          <div className="mt-10 h-lists">
            {listTiles}
          </div>
          <div className="flex items-center cursor-pointer">
            <p className="select-none place-self-center text-center pl-2 pt-4 newListButton text-gray" onClick={() => {this.props.createList()}}>+ Add List</p>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;