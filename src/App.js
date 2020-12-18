import './App.css';
import React from 'react';
import NavBar from './NavBar.js';
import Content from './Content.js';
import 'tailwindcss/tailwind.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedList: "today",
    }
  }

  render() {
    return (
      <div className="flex w-full h-screen">
        <NavBar />
        <Content />
      </div>
    );
  }
}

export default App;
