import React from "react";
import "../Styling/Container.css";
import Card from "../assets/jss/Card";
import CardBody from "../assets/jss/CardBody";
import CustomComponent from "../customComponent.js";

class ChildFlower extends CustomComponent {
  constructor(props) {
    super(props);
    //Map between database colors and css color codes
    this.colorMapping = {
      "Red": "Red",
      "White": "White",
      "Yellow": "Gold",
      "Pink": "DeepPink",
      "Orange": "DarkOrange",
      "Black": "Black",
      "Blue": "DodgerBlue",
      "Green": "LimeGreen",
      "Purple": "DarkViolet"
    }
    this.state = {
      totalPercentage: 0,
    };
  }

  async componentDidMount() {
    await this.updateTotalPercentage();
  }

  //If a new flower is calculated, we need to refresh the state to reflect the new child genetics
  async componentDidUpdate(prevProps) {
    if (this.props.listOfChildren !== prevProps.listOfChildren) {
      await this.updateTotalPercentage();
    }
  }

  //Helper function called above
  updateTotalPercentage = async function() {
    let totalPercent = 0;
    for (let child of this.props.listOfChildren) {
      totalPercent = totalPercent + child.probability;
    }
    await this.setStateAsync({ totalPercentage: totalPercent });
  }

  render() {
    return (
      <div className="ChildFlower">
        <Card style={{ width: "20rem" }}>
        <div style={{padding: "5px", backgroundColor: this.colorMapping[this.props.color]}}> </div>
          <h3>
            {this.props.color} {this.props.species}: {this.state.totalPercentage}%
          </h3>
          {(this.props.seeded === 1) ? "Sold as seeds" : ""}
          <CardBody>
            <h3>Breakdown of genes</h3>
            {this.props.listOfChildren.map((child) => (
              <div>
                <p>
                  {child.numericGenotype}: {child.probability}%
                </p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ChildFlower;
