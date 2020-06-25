import React from "react";
import "../Styling/Container.css";
import CustomComponent from "../customComponent.js";

class ChildFlower extends CustomComponent {
  render() {
    return (
        <div className="ChildFlower">
            <p>{this.props.color}</p>
        </div>
    )}
}

export default ChildFlower;
