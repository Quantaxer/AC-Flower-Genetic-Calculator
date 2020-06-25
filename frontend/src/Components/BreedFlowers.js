import React from 'react';
import '../Styling/BreedFlowers.css';
import IndividualFlower from './IndividualFlower.js';
import FlowerDropdown from './FlowerDropdown.js';
import CustomComponent from '../customComponent.js';
import ChildFlowerComponent from './ChildFlowerComponent.js'
class BreedFlowers extends CustomComponent {
  constructor(props) {
    super(props);

    this.state = {
      species: 'Tulip',
      numOfGenes: 3,
      children: []
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
      for (let childIndex in result.msg) {
        result.msg[childIndex]["probability"] = listOfChildren.msg[result.msg[childIndex].numericGenotype];
      }

      let colorArray = {};
      for (let i in result.msg) {
        let color = result.msg[i].color
        if (colorArray[color] === undefined) {
          colorArray[color] = {};
          colorArray[color]['color'] = result.msg[i].color;
          colorArray[color]['listOfFlowers'] = [];
          colorArray[color]['listOfFlowers'].push(result.msg[i]);
        }
        else {
          colorArray[color]['listOfFlowers'].push(result.msg[i]);
        }
      }

      await this.setStateAsync({ children: Object.values(colorArray) });

      console.log(this.state.children);

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
          <IndividualFlower getFlower={this.getFlowerGenes} identifier={"flower1"} numOfGenes={this.state.numOfGenes} species={this.state.species}/>
          <p>flower2</p>
          <IndividualFlower getFlower={this.getFlowerGenes} identifier={"flower2"} numOfGenes={this.state.numOfGenes} species={this.state.species}/>
          <button onClick={this.breedFlowerButtonSubmit}>Breed Flowers</button>
          <div>
            {Array.from(Array(this.state.children.length)).map((x, index) => (
              <ChildFlowerComponent identifier={index} color={this.state.children[index].color} listOfChildren={this.state.children[index].listOfFlowers}/>
            ))}
          </div>
      </div>
    );
  }
}

export default BreedFlowers;
