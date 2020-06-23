import React from "react";
import "../Styling/FlowerDropdown.css";
import CustomComponent from "../customComponent.js";

class FlowerDropdown extends CustomComponent {
  constructor(props) {
    super(props);

    this.state = {
      species: "Rose",
    };
  }

  handleChange = async (event) => {
    let numOfGenes = 3;

    await this.setStateAsync({ species: event.target.value });

    if (this.state.species === "Rose") {
      numOfGenes = 4;
    }
    this.props.getDropdown(this.state.species, numOfGenes);
  };

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
