import React from "react";
import "../Styling/Container.css";
import CustomComponent from "../customComponent.js";

class ChildFlower extends CustomComponent {
    render() {
    return (
        <div className="ChildFlower">
            <p>{this.props.color}</p>
            {this.props.listOfChildren.map(child => (
                <div>
                    <p>{child.numericGenotype}: {child.probability}%</p>
                </div>
            ))}
        </div>
    )}
}

export default ChildFlower;
