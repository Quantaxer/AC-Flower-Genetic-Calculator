import React from 'react';
import '../Styling/BreedFlowers.css';
import IndividualFlower from './IndividualFlower.js';
import FlowerDropdown from './FlowerDropdown.js';
import CustomComponent from '../customComponent';

class BreedFlowers extends CustomComponent {
  constructor(props) {
    super(props);

    this.state = {
      species: 'Tulip',
      numOfGenes: 3,
      child: []
    };
  }

  // Handler for the submit button to begin the breeding process
  breedFlowerButtonSubmit = async () => {
    
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

    // Call our fetch function below once the component mounts
    try {
      let listOfChildren = await this.postAPI('/calculateChild', {flower1: geneArray[0], flower2: geneArray[1]});
      
      await this.setStateAsync({ childList: listOfChildren.msg });

      let result = await this.postAPI('/db/getColorList', {listOfFlowers: this.state.childList, species: this.state.species});
      console.log(this.state.childList);
      console.log(result);

    }
    catch (e) {
      console.log(e);
    }
    
  }

  //Handler to get the state of a specific flower, and update this component's state
  getFlowerGenes = (flowerGenes, identifier) => {
    this.setState((prevState) => {
      let flowerObject = Object.assign({}, prevState.flowerObject);
      flowerObject[identifier] = flowerGenes;
      return {flowerObject};
    });
  };

  //Handler to get the state of the dropdown component
  getDropdown = async (flowerSpecies, genes) => {
    await this.setStateAsync({ species: flowerSpecies, numOfGenes: genes })
  };

  render() {
    return (
      <div className="Flowers">
          <FlowerDropdown getDropdown={this.getDropdown} />
          <p>Flower1</p>
          <IndividualFlower getFlower={this.getFlowerGenes} identifier={"flower1"} numOfGenes={this.state.numOfGenes}/>
          <p>flower2</p>
          <IndividualFlower getFlower={this.getFlowerGenes} identifier={"flower2"} numOfGenes={this.state.numOfGenes}/>
          <button onClick={this.breedFlowerButtonSubmit}>Breed Flowers</button>
          <p>{this.state.child}</p>
      </div>
    );
  }
}

export default BreedFlowers;
