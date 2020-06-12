import React, { Component } from "react";
import "../Styling/GeneComponent.css";

class GeneComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: "0",
    };

    this.props.getState(0, this.props.identifier);
  }

  handleChange = (changeEvent) => {
    this.setState({
      isChecked: changeEvent.currentTarget.value
    });

    this.props.getState(changeEvent.currentTarget.value, this.props.identifier);
  };

  render() {
    return (
      <div className="GeneRow">
        <div className="option">
          <input
            type="radio"
            value="0"
            checked={this.state.isChecked === "0"}
            onChange={this.handleChange}
          />
          0{" "}
          <input
            type="radio"
            value="1"
            checked={this.state.isChecked === "1"}
            onChange={this.handleChange}
          />
          1{" "}
          <input
            type="radio"
            value="2"
            checked={this.state.isChecked === "2"}
            onChange={this.handleChange}
          />
          2{" "}
        </div>{" "}
      </div>
    );
  }
}

export default GeneComponent;
