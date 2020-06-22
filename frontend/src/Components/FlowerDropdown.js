import React, { Component } from "react";
import "../Styling/FlowerDropdown.css";

class FlowerDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      species: "Rose"
    };
  }

  handleChange = (event) => {
    let numOfGenes = 3;
    //Set the state
    this.setState({
      species: event.target.value,
    }, () => {
         //Call the function to send info to parent
         if (this.state.species === "Rose") {
           numOfGenes = 4;
         }
        this.props.getDropdown(this.state.species, numOfGenes);
    });
  }

  render() {
    return (
      <div className="FlowerDropdown">
        <select value={this.state.flower} onChange={this.handleChange}>
          <option value="Tulip">Tulip</option>
          <option value="Rose">Rose</option>
          <option value="Cosmo">Cosmo</option>
          <option value="Lily">Lily</option>
          <option value="Pansy">Pansy</option>
          <option value="Hyacinth">Hyacinth</option>
          <option value="Mum">Mum</option>
          <option value="Windflower">Windflower</option>
        </select>
      </div>
    );
  }
}

export default FlowerDropdown;
