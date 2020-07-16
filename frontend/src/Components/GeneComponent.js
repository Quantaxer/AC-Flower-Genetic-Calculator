import React from "react";
import "../Styling/GeneComponent.css";
import Radio from "@material-ui/core/Radio";
import CustomComponent from "../customComponent.js";

class GeneComponent extends CustomComponent {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: "0"
    };
  }

  // Initialize state for all components in the hierarchy
  componentDidMount = () => {
    this.props.getState("0", this.props.identifier);
  };

  //Handler to let the individual flower get the information from this form
  handleChange = async (changeEvent) => {
    //Set the state
    await this.setStateAsync({ isChecked: changeEvent.currentTarget.value });

    //Call the function to send info to parent
    this.props.getState(parseInt(this.state.isChecked), this.props.identifier);
  };

  render() {

    return (
      <div className="GeneRow">
        <div className="option">
          <Radio
            value="0"
            checked={this.state.isChecked === "0"}
            onChange={this.handleChange}
          />
          0
          <Radio
            value="1"
            checked={this.state.isChecked === "1"}
            onChange={this.handleChange}
          />
          1
          <Radio
            value="2"
            checked={this.state.isChecked === "2"}
            onChange={this.handleChange}
          />
          2
        </div>
      </div>
    );
  }
}

export default GeneComponent;
