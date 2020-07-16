import React from "react";
import "../Styling/Container.css";
import Card from "../assets/jss/Card";
import CardBody from "../assets/jss/CardBody";
import CustomComponent from "../customComponent.js";

class ChildFlower extends CustomComponent {
  render() {
    return (
      <div className="ChildFlower">
          <p>Results</p>
        <Card style={{ width: "20rem" }}>
          <p>{this.props.color}</p>
          <CardBody>
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
