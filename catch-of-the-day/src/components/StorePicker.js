import React from 'react';
import { getFunName } from "../helpers"

class StorePicker extends React.Component {
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }

  goToStore( event ) {
    event.preventDefault();
    // grab the text from the input
    const storeId = this.storeInput.value;

    // transition from / to /store/:storeId 🏬
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      <div>
        {/*<form action="" className="store-selector" onSubmit={this.goToStore.bind(this)}></form>*/}
        <form action="" className="store-selector" onSubmit={(event) => this.goToStore(event)}>
          <h2>Please Enter a Store</h2>
          <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}} />
          <button type="submit">Visit Store ➡</button>
        </form>
      </div>
    );
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;