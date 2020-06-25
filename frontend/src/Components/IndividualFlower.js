import React from "react";
import "../Styling/IndividualFlower.css";
import GeneComponent from "./GeneComponent.js";
import CustomComponent from "../customComponent.js";

class IndividualFlower extends CustomComponent {
  constructor(props) {
    super(props);

    // Initialize gene mapping for the state
    let geneMap = {};
    for (let i = 0; i < this.props.numOfGenes; i++) {
      geneMap[i] = 0;
    }

    this.state = {
      color: "",
      listOfGenes: geneMap,
    };
  }

  calculateColor = async() => {
    let geneString = "";
    let strCount = 0;
    for (let geneSequence of Object.entries(this.state.listOfGenes)) {
      geneString = geneString + geneSequence[1];
      if (strCount < (Object.entries(this.state.listOfGenes).length - 1)) {
        geneString = geneString + '-';
      }
      strCount++;
    }

    let obj = {};
    obj[geneString] = 0;
    let result = await this.postAPI('/db/getColorList', {listOfFlowers: obj, species: this.props.species});
    await this.setStateAsync({color: result.msg[0].color});
  }

  async componentDidMount() {
    await this.calculateColor();
  }

  //Handler for BreedFlower to get state from this component on change
  getGeneState = async (flowerGene, geneIdentifier) => {
    //Set the state
    await this.setStateAsync((prevState) => {
      let listOfGenes = Object.assign({}, prevState.listOfGenes);
      listOfGenes[geneIdentifier] = parseInt(flowerGene);
      return { listOfGenes };
    });

    await this.calculateColor();

    //Call the function to send info to parent
    this.props.getFlower(this.state.listOfGenes, this.props.identifier);
  };

  render() {
    return (
      <div className="IndividualFlower">
        <p>{this.state.color} {this.props.species}</p>
        {Array.from(Array(this.props.numOfGenes)).map((x, index) => (
          <GeneComponent getState={this.getGeneState} identifier={index} />
        ))}
      </div>
    );
  }
}

export default IndividualFlower;
