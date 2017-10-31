import React from 'react';
import AddFishForm from "./AddFishForm"
import { formatPrice } from "../helpers"

class Inventory extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.renderInventory = this.renderInventory.bind(this);
  }

  handleChange(event, key) {
    const fish = this.props.fishes[key]
    // take a copy of the fish, and update it with the new data

    // e.target is the element itself that has changed
    /// e.target.name / e.target.value is useful
    const updatedFish = {
      ...fish,
      [event.target.name]: event.target.value
    }
    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key]

    return (
      <div className="fish-edit" key={key}>
        <input name="name" type="text" placeholder="Fish Name" value={fish.name} onChange={(e) => this.handleChange(e, key)} />
        <input name="price" type="text" placeholder="Fish Price" value={formatPrice(fish.price)} onChange={(e) => this.handleChange(e, key)} />
        <select name="status" value={fish.status} onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea name="desc" type="text" placeholder="Fish Desc" value={fish.desc} onChange={(e) => this.handleChange(e, key)} />
        <input name="image" type="text" placeholder="Fish Image" value={fish.image} onChange={(e) => this.handleChange(e, key)} />
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }
  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;