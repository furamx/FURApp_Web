import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import FormSpecies from './jsx/pages/SpeciesForm/SpeciesForm';
// import Header from './jsx/common/header';
import MapForm from './jsx/pages/MapForm/MapForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      appName: "FURA Web App"
    };
  }
  render() {
    return (
      <div className="App">
        {/* <Header/> */}
        <MapForm />

        {/* <FormSpecies/> */}
      </div>
    );
  }
}

export default App;
