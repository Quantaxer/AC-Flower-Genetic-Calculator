import React, { Component } from "react";
import "../Styling/IndividualFlower.css";
import GeneComponent from "./GeneComponent.js";

class IndividualFlower extends Component {
  constructor(props) {
    super(props);

    let geneMap = {};
    for (let i = 0; i < this.props.numOfGenes; i++) {
        geneMap[i] = -1;
    }

    this.state = {
      listOfGenes: geneMap
    };
  }

  getGeneState = (flowerGene, geneIdentifier) => {
    this.setState(prevState => {
      let listOfGenes = Object.assign({}, prevState.listOfGenes);
      listOfGenes[geneIdentifier] = flowerGene;
      return {listOfGenes};
    });

  };
  render() {
    return (
      <div className="IndividualFlower">
        {Array.from(Array(this.props.numOfGenes)).map((x, index) => <GeneComponent getState={this.getGeneState} identifier={index}/>)}
      </div>
    );
  }
}

export default IndividualFlower;
