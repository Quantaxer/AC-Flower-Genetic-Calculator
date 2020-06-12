import React, { Component } from "react";
import "../Styling/IndividualFlower.css";
import GeneComponent from "./GeneComponent.js";

class IndividualFlower extends Component {
  constructor(props) {
    super(props);

    // Initialize gene mapping for the state
    let geneMap = {};
    for (let i = 0; i < this.props.numOfGenes; i++) {
        geneMap[i] = 0;
    }

    this.state = {
      listOfGenes: geneMap
    };
  }

  //Handler for BreedFlower to get state from this component on change
  getGeneState = (flowerGene, geneIdentifier) => {
    //Set the state
    this.setState(prevState => {
      let listOfGenes = Object.assign({}, prevState.listOfGenes);
      listOfGenes[geneIdentifier] = parseInt(flowerGene);
      return {listOfGenes};
    }, () => {
         //Call the function to send info to parent
        this.props.getFlower(this.state.listOfGenes, this.props.identifier);
    }
    )};


  render() {
    return (
      <div className="IndividualFlower">
        {Array.from(Array(this.props.numOfGenes)).map((x, index) => <GeneComponent getState={this.getGeneState} identifier={index}/>)}
      </div>
    );
  }
}

export default IndividualFlower;
