import React, { Component } from 'react';
import '../Styling/BreedFlowers.css';
import IndividualFlower from './IndividualFlower.js'

class BreedFlowers extends Component {
  render() {
    return (
      <div className="Flowers">
          <IndividualFlower/>
          <IndividualFlower/>
      </div>
    );
  }
}

export default BreedFlowers;
