import React, { Component } from "react";
import "../Styling/IndividualFlower.css";
import GeneComponent from "./GeneComponent.js";

class IndividualFlower extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gene: 0,
    };
  }

  getGeneState = (flowerGene, geneIdentifier) => {
    
    this.setState({
      gene: flowerGene,
    });
  };
  render() {
    return (
      <div className="IndividualFlower">
        <GeneComponent getState={this.getGeneState} identifier={0}/>
        <GeneComponent getState={this.getGeneState} identifier={1}/>
        <GeneComponent getState={this.getGeneState} identifier={2}/>
      </div>
    );
  }
}

export default IndividualFlower;
