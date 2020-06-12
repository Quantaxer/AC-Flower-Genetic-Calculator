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

  componentDidMount() {

  }

  onClick = () => {
    let geneArray = [];
    let shouldIBreed = true;
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

    if (shouldIBreed) {
      console.log(geneArray);
    }
  }

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
