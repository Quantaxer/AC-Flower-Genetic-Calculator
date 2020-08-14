import React from "react";
import "../Styling/IndividualFlower.css";
import GeneComponent from "./GeneComponent.js";
import CustomComponent from "../customComponent.js";
import flowerIcon from "../assets/flower_seeded_icon.png";

class IndividualFlower extends CustomComponent {
  constructor(props) {
    super(props);

    // map of a list of the flower's genes: based on the total number of genes of the species of flower
    let geneMap = {};
    for (let i = 0; i < this.props.numOfGenes; i++) {
      geneMap[i] = 0;
    }

    this.state = {
      color: "",
      seeded: 0,
      geneMapping: geneMap,
    };
  }

  async componentDidMount() {
    await this.calculateColor();
  }

  calculateColor = async() => {
    //Convert the gene map into a string
    let geneString = this.hyphenateGeneString(this.state.geneMapping);

    //Send the gene combination and species to the database to get the color of the flower
    let obj = {};
    obj[geneString] = 0;
    let result = await this.postAPI('/db/getColorList', {listOfFlowers: obj, species: this.props.species});
    await this.setStateAsync({color: result.msg[0].color, seeded: result.msg[0].seeded});
  }

  //Handler for BreedFlower to get state from this component on change
  getGeneState = async (flowerGene, geneIdentifier) => {
    //Set the state
    await this.setStateAsync((prevState) => {
      let geneMapping = Object.assign({}, prevState.geneMapping);
      geneMapping[geneIdentifier] = parseInt(flowerGene);
      return { geneMapping };
    });

    await this.calculateColor();

    //Call the function to send info to BreedFlowers.js
    this.props.getFlower(this.state.geneMapping, this.props.identifier);
  };

  //Component render
  render() {
    return (
      <div className="IndividualFlower">
        <h3> {(this.state.seeded === 1) ? <img width="20px" height="20px" src={flowerIcon} alt="Flower seeds icon indicating a flower is sold as seeds in Nook's Shop"/> : ""} {this.state.color} {this.props.species}</h3>
        {Array.from(Array(this.props.numOfGenes)).map((x, index) => (
          <GeneComponent getState={this.getGeneState} identifier={index} />
        ))}
      </div>
    );
  }
}

export default IndividualFlower;
