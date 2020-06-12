import React, { Component } from 'react';
import '../Styling/BreedFlowers.css';
import IndividualFlower from './IndividualFlower.js'

class BreedFlowers extends Component {
  render() {
    return (
      <div className="Flowers">
          <p>Flower1</p>
          <IndividualFlower numOfGenes={4}/>
          <p>flower2</p>
          <IndividualFlower numOfGenes={3}/>
      </div>
    );
  }
}

export default BreedFlowers;
