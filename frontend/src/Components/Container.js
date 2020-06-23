import React from "react";
import "../Styling/Container.css";
import CustomComponent from "../customComponent.js";

class Container extends CustomComponent {
  render() {
    return <div className="Container">{this.props.children}</div>;
  }
}

export default Container;
