import React from 'react';
import 'tailwindcss/tailwind.css';
import Tile from './Tile.js';
import ListTile from './ListTile.js';
import LogoutIcon from '../icons/logout.svg';
import { signout } from '../FirebaseConfig.js'
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  calcDayDifference(day) {
    return Math.ceil((day.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24))
  }

  getTodayCount() {
    return Object.values(this.props.tasks).filter(task => task.due !== null && this.calcDayDifference(task.due) === 0).length
  }

  getUpcomingCount() {
    return Object.values(this.props.tasks).filter(task => task.due !== null && this.calcDayDifference(task.due) <= 7).length
  }

  getAllCount() {
    return Object.values(this.props.tasks).length
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
            <Tile
              title="today"
              icon="today"
              taskCount={this.getTodayCount()}
              selectedList={this.props.selectedList}
              rootHandlers={this.props.rootHandlers}
            />
            <Tile
              title="upcoming"
              icon="upcoming"
              taskCount={this.getUpcomingCount()}
              selectedList={this.props.selectedList}
              rootHandlers={this.props.rootHandlers}
            />
            <Tile
              title="all"
              icon="all"
              taskCount={this.getAllCount()}
              selectedList={this.props.selectedList}
              rootHandlers={this.props.rootHandlers}
            />
          </div>

          <div className="mt-10 h-lists">
            {listTiles}
          </div>
          <div className="grid grid-cols-2 items-center cursor-pointer">
            <p
              className="select-none place-self-center text-center pl-2 pt-4 newListButton text-gray"
              onClick={() => { this.props.rootHandlers.createList() }}
            >+ Add List</p>
            <div className="select-none text-right pl-2 pt-4 text-gray">
              <img
                src={LogoutIcon} alt="logout"
                className="float-right" 
                onClick={() => {signout()}}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;