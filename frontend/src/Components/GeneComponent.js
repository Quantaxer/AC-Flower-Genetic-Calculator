import React, { Component } from "react";
import "../Styling/GeneComponent.css";

class GeneComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: "0",
    };
  }

  // Initialize state for all components in the hierarchy
  componentDidMount = () => {
    this.props.getState("0", this.props.identifier);
  };

  //Handler to let the individual flower get the information from this form
  handleChange = (changeEvent) => {
    //Set the state
    this.setState({
      isChecked: changeEvent.currentTarget.value,
    });

     //Call the function to send info to parent
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
