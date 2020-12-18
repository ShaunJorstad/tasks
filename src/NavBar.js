import React from 'react';
import 'tailwindcss/tailwind.css';
import Tile from './Tile.js';
import { db } from './FirebaseConfig';

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      activeList: "today",
      todayTasks: 5,
      upcomingTasks: 10,
      allTasks: 15,
      flaggedTasks: 30
    }

    db.collection('lists').doc('listName').get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

    this.handler = this.handler.bind(this)
  }

  handler = (list) => {
    this.setState({
      activeList: list
    })
  }

  render() {

    return (
      <div className="bg-navBackground h-full w-372">
        <div className="px-2">
          <input className="w-full mt-5 py-1 bg-tileUnselected border-tileUnselectedBorder border-2 px-3 rounded-md text-sm" type="text" id="searchBar" placeholder="search"></input>
          <div className="grid mt-5 grid-cols-2 gap-x-3 gap-y-3">
            <Tile title="today" icon="today" taskCount='40' activeList={this.state.activeList} handler={this.handler} />
            <Tile title="upcoming" icon="upcoming" taskCount='40' activeList={this.state.activeList} handler={this.handler}/>
            <Tile title="all" icon="all" taskCount='40' activeList={this.state.activeList} handler={this.handler} />
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;