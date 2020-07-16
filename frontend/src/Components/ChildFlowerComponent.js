import React from "react";
import "../Styling/Container.css";
import Card from "../assets/jss/Card";
import CardBody from "../assets/jss/CardBody";
import CustomComponent from "../customComponent.js";

class ChildFlower extends CustomComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalPercentage: 0,
    };
  }
  async componentDidMount() {
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
          <p>
            {this.props.color} {this.props.species}: {this.state.totalPercentage}%
          </p>
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
