import React, { Component } from 'react';
import '../Styling/BreedFlowers.css';
import IndividualFlower from './IndividualFlower.js';
import FlowerDropdown from './FlowerDropdown.js';

class BreedFlowers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      species: 'Tulip',
      numOfGenes: 3,
      child: [],
      flowerObject: {
      }
    };
  }

    getAPI = async (endpoint) => {
      const response = await fetch(endpoint);
      const body = await response.json();

      if (response.status !== 200 || response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };

    postAPI = async (endpoint, postBody) => {
        let response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postBody)
        });
        const body = await response.json();
  
        if (response.status !== 200 || response.status !== 200) {
          throw Error(body.message) 
        }
        return body;
    };

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

      // Call our fetch function below once the component mounts
    this.postAPI('/calculateChild', {flower1: geneArray[0], flower2: geneArray[1]})
      .then(
        //res => this.setState({ child: res.msg })
        res => console.log(res.msg)
      )
      .catch(err => console.log(err));
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
  getDropdown = (species, genes) => {
    this.setState({
      flower: species,
      numOfGenes: genes
    });
  };

  render() {
    return (
      <div className="Flowers">
          <FlowerDropdown getDropdown={this.getDropdown} />
          <p>Flower1</p>
          <IndividualFlower getFlower={this.getFlowerGenes} identifier={"flower1"} numOfGenes={this.state.numOfGenes}/>
          <p>flower2</p>
          <IndividualFlower getFlower={this.getFlowerGenes} identifier={"flower2"} numOfGenes={this.state.numOfGenes}/>
          <button onClick={this.onClick}>Breed Flowers</button>
          <p>{this.state.child}</p>
      </div>
    );
  }
}

export default BreedFlowers;
