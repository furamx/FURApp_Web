import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import FormSpecies from './SpeciesForm/SpeciesForm';

class App extends Component {
  constructor(){
    super();
    this.state = {
      appName : "FURA Web App"
    };
  }
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <h3>{this.state.appName}</h3>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <FormSpecies/>
      </div>
    );
  }
}

export default App;
