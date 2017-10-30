import React from 'react';
import base from '../base';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

import sampleFishes from '../sample-fishes';

class App extends React.Component {
  constructor() {
    super();

    // getinitialState (es6 variation)
    this.state = {
      fishes: {},
      order: {}
    };

    this.addFish = this.addFish.bind( this );
    this.updateFish = this.updateFish.bind(this)
    this.loadSamples = this.loadSamples.bind( this );
    this.addToOrder = this.addToOrder.bind(this);

  }

  componentWillMount() {
    // This runs right before the App is rendered
    this.base = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })

    // check if there's any order data in local storage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)

    if(localStorageRef) {
      // pudate our App component's order state
      this.setState({ order: JSON.parse(localStorageRef) })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.base);
  }

  componentWillUpdate(newProps, newState) {
    console.log('something changed');
    console.log({ newProps, newState });

    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(newState.order));
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

  updateFish(key, fish) {
    const fishes = {...this.state.fishes}
    fishes[key] = fish
    this.setState({ fishes })
  }

  loadSamples() {
    console.log( 'Load 🐠 🐟 🐡' );

    this.setState( {
      fishes: sampleFishes
    } )
  }

  addToOrder(key) {
    // take a copy of state
    const order = {...this.state.order};

    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;

    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory fishes={this.state.fishes} addFish={this.addFish} updateFish={this.updateFish} loadSamples={this.loadSamples}/>
      </div>
    );
  }
}

export default App;