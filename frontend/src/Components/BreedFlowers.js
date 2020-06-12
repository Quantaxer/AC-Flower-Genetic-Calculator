import React, { Component } from 'react';
import '../Styling/BreedFlowers.css';
import IndividualFlower from './IndividualFlower.js'

class BreedFlowers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      flower: 'Rose',
      flowerObject: {
      }
    };
  }

  // Handler for the submit button to begin the breeding process
  onClick = () => {
    let geneArray = [];

    //Iterate through all the flowers and build the resulting gene string
    for (let flower of Object.values(this.state.flowerObject)) {
      let geneString = "";
      let strCount = 0;
      for (let geneSequence of Object.entries(flower)) {
        geneString = geneString + geneSequence[1];
        if (strCount < (Object.entries(flower).length - 1)) {
          geneString = geneString + '-';
        }
        strCount++;
      }
      geneArray.push(geneString);
    }

    console.log(geneArray);
  }

  //Handler to get the state of a specific flower, and update this component's state
  getFlowerGenes = (flowerGenes, identifier) => {
    this.setState((prevState) => {
      let flowerObject = Object.assign({}, prevState.flowerObject);
      flowerObject[identifier] = flowerGenes;
      return {flowerObject};
    });
  };

  render() {
    return (
      <div className="Flowers">
          <p>Flower1</p>
          <IndividualFlower getFlower={this.getFlowerGenes} identifier={"flower1"} numOfGenes={4}/>
          <p>flower2</p>
          <IndividualFlower getFlower={this.getFlowerGenes} identifier={"flower2"} numOfGenes={3}/>
          <button onClick={this.onClick}>Breed Flowers</button>
      </div>
    );
  }
}

export default BreedFlowers;
