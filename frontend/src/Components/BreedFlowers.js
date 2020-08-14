import React from 'react';
import '../Styling/BreedFlowers.css';
import Button from "../assets/jss/Button"
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
    for (let flowerGeneMap of Object.values(this.state.flowerObject)) {
      geneArray.push(this.hyphenateGeneString(flowerGeneMap));
    }

    try {
      //Calcualte the genetics of the child flower, then get the color for every resulting possible child.
      let listOfChildren = await this.postAPI('/calculateChild', {flower1: geneArray[0], flower2: geneArray[1]});
      
      await this.setStateAsync({ childList: listOfChildren.msg });

      let result = await this.postAPI('/db/getColorList', {listOfFlowers: this.state.childList, species: this.state.species});
      for (let i in result.msg) {
        result.msg[i]["probability"] = listOfChildren.msg[result.msg[i].numericGenotype];
      }


      let colorArray = {};
      for (let i in result.msg) {
        let color = result.msg[i].color
        //If the color is not in the map, add it with new values. Otherwise simply put that flower with the respective color.
        if (colorArray[color] === undefined) {
          colorArray[color] = {};
          colorArray[color]['color'] = result.msg[i].color;
          colorArray[color]['species'] = result.msg[i].species;
          colorArray[color]['seeded'] = result.msg[i].seeded;
          colorArray[color]['listOfFlowers'] = [];
          colorArray[color]['listOfFlowers'].push(result.msg[i]);
        }
        else {
          colorArray[color]['listOfFlowers'].push(result.msg[i]);
        }
      }
      await this.setStateAsync({ children: Object.values(colorArray) });

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
      <div className="breedFlowerModule">
          <h2>Select Flower Breed</h2>
          <FlowerDropdown getDropdown={this.getDropdown} />
          <div className="Flowers">
            <div className="flower1">
              <IndividualFlower getFlower={this.getFlowerGenes} identifier={"flower1"} numOfGenes={this.state.numOfGenes} species={this.state.species}/>
            </div>
            <div className="flower2">
              <IndividualFlower getFlower={this.getFlowerGenes} identifier={"flower2"} numOfGenes={this.state.numOfGenes} species={this.state.species}/>
            </div>
          </div>
          <Button color="rose" onClick={this.breedFlowerButtonSubmit}>Breed Flowers</Button>
          <div className="grid">
            {Array.from(Array(this.state.children.length)).map((x, index) => (
              <div className="gridChild">
                <ChildFlowerComponent identifier={index} species={this.state.children[index].species} seeded={this.state.children[index].seeded} color={this.state.children[index].color} listOfChildren={this.state.children[index].listOfFlowers}/>
              </div>
            ))}
          </div>
      </div>
    );
  }
}

export default BreedFlowers;
