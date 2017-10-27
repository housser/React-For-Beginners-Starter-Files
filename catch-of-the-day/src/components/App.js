import React from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  constructor() {
    super();

    // getinitialState (es6 variation)
    this.state = {
      fishes: {},
      order: {}
    };

    this.addFish = this.addFish.bind( this );
  }

  addFish( fish ) {
    // update our state
    // this.state.fishes.fish1 = fish; // this does work, but it's better to copy first, for "performance and avoiding race conditions"
    const fishes = { ...this.state.fishes };
    const timestamp = Date.now();
    fishes[ `fish-${timestamp}` ] = fish;

    // set state
    this.setState( { fishes } );
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
        </div>
        <Order/>
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}

export default App;