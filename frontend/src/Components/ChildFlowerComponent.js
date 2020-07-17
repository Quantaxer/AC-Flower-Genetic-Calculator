import React from "react";
import "../Styling/Container.css";
import Card from "../assets/jss/Card";
import CardBody from "../assets/jss/CardBody";
import CustomComponent from "../customComponent.js";

class ChildFlower extends CustomComponent {
  constructor(props) {
    super(props);
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

  updateTotalPercentage = async function() {
    let totalPercent = 0;
    console.log("Starting calculation");
    for (let child of this.props.listOfChildren) {
      console.log(child.probability);
      totalPercent = totalPercent + child.probability;
    }
    await this.setStateAsync({ totalPercentage: totalPercent });
  }

  async componentDidMount() {
    await this.updateTotalPercentage();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.listOfChildren !== prevProps.listOfChildren) {
      await this.updateTotalPercentage();
    }
  }

  render() {
    return (
      <div className="ChildFlower">
        <Card style={{ width: "20rem" }}>
        <div style={{padding: "5px", backgroundColor: this.colorMapping[this.props.color]}}> </div>
          <h3>
            {this.props.color} {this.props.species}: {this.state.totalPercentage}%
          </h3>
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
